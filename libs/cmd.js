import { spawn } from 'child_process'

/**
 *
 * @param {string} command
 * @param {string[]} args
 * @param {Record<string, any>|string[]} options
 * @returns {Promise<string>} command stand output
 */
export function runTDL(command, args, options) {
    const spawnOptions = [command]
    if (args) {
        spawnOptions.push(...args)
    }
    if (options) {
        Object.entries(options).forEach(([key, value]) => {
            if (value === undefined) {
                return
            }
            if (value === true) {
                spawnOptions.push(`--${key}`)
                return
            }
            if (Array.isArray(value)) {
                value.forEach((val) => {
                    spawnOptions.push(`--${key}`, val)
                })
                return
            }
            spawnOptions.push(`--${key}`, value)
        })
    }

    console.log('🏃 tdl', spawnOptions.join(' '))
    const cmd = spawn('tdl', spawnOptions)

    let output = ''
    cmd.stdout.on('data', (data) => {
        output += data
        console.log(`${data}`)
    })

    return new Promise((resolve, reject) => {
        cmd.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`)
            reject(data)
        })

        cmd.on('close', (code) => {
            if (code === 0) {
                resolve(output)
            } else {
                console.log(`child process exited with code ${code}`)
                reject()
            }
        })
    })
}
