import { download } from './dl.js'
import { logger } from './logger.js'

export default async function downloadComment(url, length = 1, folder) {
    logger.info(`Download ${url} ${length} comments`)
    if (!folder) {
        folder = '' + Date.now()
    }
    if (Array.isArray(url)) {
        return download(url, folder)
    }
    const start = new URL(url)
    const commentId = start.searchParams.get('comment')
    const urls = Array.from({
        length,
    }).map((_, idx) => {
        const id = Number(commentId) + idx
        const url = new URL(start)
        url.searchParams.set('comment', id)
        return url.toString()
    })
    await download(urls, folder)
    logger.info(`Download Done: ${url} ${length} comments`)
}
