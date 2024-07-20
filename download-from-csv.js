import downloadFromCSV from './libs/dl-from-csv.js'

const filePath = process.argv[2]
if (!filePath) {
    throw new Error('input file path as argument')
}
downloadFromCSV(filePath)
