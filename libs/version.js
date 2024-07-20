import { runTDL } from './cmd.js'

export async function getVersion() {
    const output = await runTDL('version')
    const versionStr = output.split('\n')[0].split(': ')[1].trim()
    if (!versionStr.match(/^\d+\.\d+\.\d+$/)) {
        throw new Error('Fail to parse version')
    }
    return versionStr
}
