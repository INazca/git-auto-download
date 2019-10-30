/* eslint-disable no-console */
/* eslint-env node */
const {Command, flags} = require('@oclif/command')
const csv = require('csv-parser')
const fs = require('fs')

class DownloadCommand extends Command {
  async run() {
    const {args} = this.parse(DownloadCommand)

    parseFile(`${process.cwd()}\\${args.file}`)
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
  name: flags.string({char: 'n', description: 'name to print'}),
}

function parseFile(path) {
  var paths = []

  fs.createReadStream(path)
  .pipe(csv())
  .on('error', error => console.error(error))
  .on('data', data => paths.push(data))
  .on('end', () => {
    setupRepos(paths)
  })
}

function setupRepos(paths) {
  paths.forEach(path => {
    console.log(path.path)
  })
}

module.exports = DownloadCommand
