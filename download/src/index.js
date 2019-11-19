/* eslint-disable no-console */
/* eslint-env node */
const {Command, flags} = require('@oclif/command')
const csv = require('csv-parser')
const fs = require('fs')
const settings = require('./settings')
var exec = require('child_process').exec

class DownloadCommand extends Command {
  async run() {
    var template
    const {args} = this.parse(DownloadCommand)
    if (args.template) {
      template = `${process.cwd()}\\${args.template}`
    }
    parseFile(`${process.cwd()}\\${args.file}`, template)
  }
}

DownloadCommand.description = settings.description

// specifiy arguments for the command here
DownloadCommand.args = [
  {
    name: 'file',
    required: true,
  },
  {
    name: 'template',
    required: false,
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
}

function parseFile(path, template) {
  var paths = []

  fs.createReadStream(path)
  .pipe(csv())
  .on('error', error => console.error(error))
  .on('data', data => paths.push(data))
  .on('end', () => {
    mkdirGitFolder(paths, template)
  })
}

function setupRepositories(paths, args) {
  // change current working directory to destination folder
  cd(settings.destination)
  setupRepository(paths, args, 0)
}

function setupRepository(paths, template, count) {
  exec(`git clone ${paths[count].path}`, function (err) {
    if (err) {
      console.log(err)
    } else if (template) {
      createReviewBranch(paths, template, count)
    } else if (count !== paths.length - 1) {
      setupRepository(paths, template, count + 1)
    }
  })
}

function createReviewBranch(paths, template, count) {
  // change path to cloned repository
  cd(parseGitLink(paths[count].path))
  // create the new branch locally
  exec('git checkout -b review', function (err) {
    if (err) {
      console.log(err)
    } else {
      // now create a revision file
      createRevisionFile(paths, template, count)
    }
  })
}

function createRevisionFile(paths, template, count) {
  fs.readFile(template, 'utf8', function (err, content) {
    if (err) {
      console.log(err)
    } else {
      fs.writeFile(settings.revFileName, content, function (err) {
        if (err) {
          console.log(err)
        } else {
          exec(`git add ${settings.revFileName}`, function (err) {
            if (err) {
              console.log(err)
            } else {
              // commit the new changes
              exec('git commit -m "Create revision file"', function (err) {
                if (err) {
                  console.log(err)
                } else {
                  // put code here later
                  pushChanges(paths, template, count)
                }
              })
            }
          })
        }
      })
    }
  })
}

function pushChanges(paths, template, count) {
  exec('git push origin review', function (err) {
    if (err) {
      console.log(err)
    }
    // reset for the next repository
    cd('../')
    if (count !== paths.length - 1) {
      setupRepository(paths, template, count + 1)
    }
  })
}

function mkdirGitFolder(paths, template) {
  exec('mkdir git-repositories', function (err) {
    if (err) {
      if (err.code === 1) {
        setupRepositories(paths, template)
      } else {
        console.log(err)
      }
    } else {
      setupRepositories(paths, template)
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
