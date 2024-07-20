import { getAppData, writeAppData } from '../shared/utils.js'
import { appName } from '../const.js'
import downloadFolder from 'downloads-folder'

const configFile = 'config.json'

const defaultConfig = () => {
    return {
        download: {
            folder: downloadFolder(),
            proxy: {
                url: '',
            },
        },
    }
}

/**
 *
 * @returns {ReturnType<typeof defaultConfig>}
 */
export async function getAppConfig() {
    const data = await getAppData(appName, configFile)
    if (!data) {
        const config = defaultConfig()
        await writeAppConfig(config)
        return config
    }
    return JSON.parse(data)
}

export async function writeAppConfig(config) {
    const configPath = await writeAppData(
        appName,
        configFile,
        JSON.stringify(config)
    )
    return configPath
}
