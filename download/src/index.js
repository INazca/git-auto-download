/* eslint-disable no-console */
/* eslint-env node */
const {Command, flags} = require('@oclif/command')
const csv = require('csv-parser')
const fs = require('fs')
var exec = require('child_process').exec

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
    mkdirGitFolder(paths, flags)
  })
}

function setupRepositories(paths, flags) {
  // change current working directory to destination folder
  cd('git-repositories')
  setupRepository(paths, flags, 0)
}

function setupRepository(paths, flags, count) {
  exec(`git clone ${paths[count].path}`, function (err) {
    if (err) {
      console.log(err)
    } else if (flags.grade) {
      createReviewBranch(paths, flags, count)
    }
  })
}

function createReviewBranch(paths, flags, count) {
  // change path to cloned repository
  cd(parseGitLink(paths[count].path))
  // create the new branch locally
  exec('git checkout -b review', function (err) {
    if (err) {
      console.log(err)
    } else {
      // now push the changes
      exec('git push origin review', function (err) {
        if (err) {
          console.log(err)
        }
        // reset for the next repository
        cd('../')
        if (count !== paths.length - 1) {
          setupRepository(paths, flags, count + 1)
        }
      })
    }
  })
}

// this function will be used later
function createRevisionFile(paths, flags, count) {
  exec('type nul > revision.txt', function (err) {
    if (err) {
      console.log(err)
    } else {
      exec('git add revision.txt', function (err) {
        if (err) {
          console.log(err)
        } else {
          // commit the new changes
          exec('git commit -m "Create revision file"', function (err) {
            if (err) {
              console.log(err)
            } else {
              // put code here later
            }
          })
        }
      })
    }
  })
}

function mkdirGitFolder(paths, flags) {
  exec('mkdir git-repositories', function (err) {
    if (err) {
      if (err.code === 1) {
        setupRepositories(paths, flags)
      } else {
        console.log(err)
      }
    } else {
      setupRepositories(paths, flags)
    }
  })
}

function cd(dir) {
  try {
    process.chdir(dir)
  } catch (error) {
    console.log(error)
  }
}

function parseGitLink(path) {
  return path.substring(path.lastIndexOf('/') + 1, path.length)
}

module.exports = DownloadCommand
