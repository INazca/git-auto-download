const {Command, flags} = require('@oclif/command')

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

function downloadFile(path){
  console.log(path)
}

module.exports = DownloadCommand
