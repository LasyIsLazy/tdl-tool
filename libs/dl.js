import path from 'path'
import { runTDL } from './cmd.js'
import { getAppConfig } from './config.js'
import { logger } from './logger.js'

/**
 *
 * @param {string[]} urls
 * @param {string} folder
 */
export async function download(urls, folder = '') {
    const config = await getAppConfig()
    logger.info(`config: ${JSON.stringify(config)}`)
    let dir = config.download.folder
    if (folder) {
        dir = path.join(dir, folder)
    }
    logger.info(`Start download ${JSON.stringify(urls)} to ${dir}`)
    try {
        await runTDL('dl', [], {
            url: urls,
            dir,
            template: '{{ .FileName }}',
            // max number of concurrent tasks (default 2)
            limit: 4,
            proxy: config.download.proxy,
        })
        logger.info(`Done downloading ${JSON.stringify(urls)}`)
    } catch (error) {
        logger.error(`Error downloading ${JSON.stringify(urls)}`)
        throw error
    }
}
