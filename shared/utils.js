import { __os_appdata_path } from '@spongex/os-appdata-path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

export async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export async function writeAppData(app, fileRelativePath, data) {
    const filePath = path.join(__os_appdata_path, app, fileRelativePath)
    const created = await mkdir(path.join(__os_appdata_path, app), {
        recursive: true,
    })
    await writeFile(filePath, data, {
        encoding: 'utf8',
    })
    return filePath
}
export async function getAppData(app, fileRelativePath) {
    const filePath = path.join(__os_appdata_path, app, fileRelativePath)
    const data = await readFile(filePath, {
        encoding: 'utf8',
    }).catch((err) => {
        if (err.code === 'ENOENT') {
            return undefined
        }
        throw err
    })
    return data
}
