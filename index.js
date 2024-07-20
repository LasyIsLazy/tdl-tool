import { Command } from 'commander'
import downloadPost from './libs/dl-post.js'
import downloadComment from './libs/dl-comment.js'

const program = new Command()

program
    .command('dl-post')
    .argument('<url>', 'url to download')
    .option('--length <length>')
    .action(function (url) {
        const { length } = this.opts()
        downloadPost(url, length && Number(length))
    })

program
    .command('dl-comment')
    .argument('<url>', 'url to download')
    .option('--length <length>')
    .action(function (url) {
        const { length } = this.opts()
        downloadComment(url, length && Number(length))
    })

program.parse()
