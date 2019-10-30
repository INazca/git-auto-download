/* eslint-disable no-console */
/* eslint-env node */
const {Command, flags} = require('@oclif/command')
const fs = require('fs')

class DownloadCommand extends Command {
  async run() {
    const {args} = this.parse(DownloadCommand)

    downloadFile(`${process.cwd()}\\${args.file}`)
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

function downloadFile(path) {
  fs.readFile(path, 'utf8', onFileRead)
  console.log('reading file')
}

function onFileRead(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
}

module.exports = DownloadCommand
