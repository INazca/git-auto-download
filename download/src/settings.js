/* eslint-env node */

const settings = {
  // specify the name of the folder to which the repositories will be cloned. Folder can either exist already or it will be created
  destination: 'git-repositories',
  // set the command description
  description: `Used to download a list of git-repositories
    ...
    flags:
    --grade: For each repository in the handed list, create a review branch and a revision file, that is made up by a template
    `,
  // specify the name of the template. This template has to be saved to git-auto-download/download/
  templateFile: 'template.md',
  // set the name of the revision file
  revFileName: 'revision.md',
}

module.exports = settings
