import { download } from './dl.js'
import { logger } from './logger.js'

export default async function downloadPost(url, length = 1, folder = '') {
    length = Number(length) ? Number(length) : 1
    logger.info(`Download ${url} ${length} posts`)
    if (!folder) {
        folder = '' + Date.now()
    }
    if (Array.isArray(url)) {
        return download(url, folder)
    }
    if (!length || length === 1) {
        return download([url], folder)
    }

    const start = (() => {
        const newUrl = new URL(url)
        newUrl.search = ''
        return newUrl.toString()
    })()

    const postId = Number(start.split('/').at(-1))
    const urls = Array.from({
        length,
    }).map((_, idx) => {
        const urlSplit = start.split('/')
        urlSplit.pop()
        urlSplit.push(postId + idx)
        return urlSplit.join('/')
    })
    await download(urls, folder)
    logger.info(`Downloaded ${url} ${length} posts`)
}
