import { createWriteStream, WriteStream } from 'fs'

const infoStream = createWriteStream('./tdl_tool.log')
const errorStream = createWriteStream('./tdl_tool_error.log')

/**
 *
 * @param {WriteStream} stream
 * @param {string} msg
 */
const log = (stream, msg) => {
    const time = new Date().toLocaleString()
    if (msg instanceof Error) {
        console.error(time, msg)
        msg = msg.stack || msg.toString()
    } else {
        console.log(`${time} ${msg}`)
    }
    stream.write(`${time} ${msg}\n`)
}
export const logger = {
    info(msg) {
        log(infoStream, msg)
    },
    error(msg) {
        log(infoStream, msg)
        log(errorStream, msg)
    },
}
