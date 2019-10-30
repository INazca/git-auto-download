/* eslint-disable no-console */
/* eslint-env node */
const {Command, flags} = require('@oclif/command')
const csv = require('csv-parser')
const fs = require('fs')

class DownloadCommand extends Command {
  async run() {
    const {args} = this.parse(DownloadCommand)
    const {flags} = this.parse(DownloadCommand)
    parseFile(`${process.cwd()}\\${args.file}`, flags)
  }
}

DownloadCommand.description = `Describe the command here
...
Extra documentation goes here
`

// specifiy arguments for the command here
DownloadCommand.args = [
  {
    name: 'file',
    required: true,
  },
]

// specify flags of the command here
DownloadCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  grade: flags.boolean({
    char: 'g',
    default: false,
  }),
  name: flags.string({char: 'n', description: 'name to print'}),
}

function parseFile(path, flags) {
  var paths = []

  fs.createReadStream(path)
  .pipe(csv())
  .on('error', error => console.error(error))
  .on('data', data => paths.push(data))
  .on('end', () => {
    setupRepositories(paths, flags)
  })
}

function setupRepositories(paths, flags) {
  console.log(flags.grade)
  paths.forEach(path => {
    console.log(path.path)
  })
}

module.exports = DownloadCommand
