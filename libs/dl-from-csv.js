import { readFile } from 'fs/promises'
import { logger } from './logger.js'
import downloadComment from './dl-comment.js'
import downloadPost from './dl-post.js'

export default async function downloadFromCSV(filePath) {
    logger.info(`Download from csv: ${filePath}`)
    const content = await readFile(filePath, { encoding: 'utf8' })
    const list = content.split('\n').filter((line) => line.trim())
    list.shift()
    const len = list.length
    logger.info(`${len} records to download`)
    for (const [index, line] of list.entries()) {
        const progressStr = `${index + 1}/${len}`
        let [link, linkCount, folder] = line.split(',')
        if (folder) {
            folder = folder.trim()
        }
        logger.info(`Start ${progressStr}, comment`)
        if (folder) {
            logger.info(`Download to ${folder}`)
        }
        try {
            if (new URL(link).searchParams.has('comment')) {
                await downloadComment(link, Number(linkCount), folder)
            } else {
                await downloadPost(link, Number(linkCount), folder)
            }
            logger.info(`✅Done ${progressStr}`)
        } catch (error) {
            logger.info(`⚠️Failed ${progressStr} when download link ${link}`)
            logger.error(error)
        }
    }
    logger.info(`🏁Done`)
}
