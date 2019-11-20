git-auto-download
=================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/download.svg)](https://npmjs.org/package/download)
[![CircleCI](https://circleci.com/gh/INazca/git-auto-download/tree/master.svg?style=shield)](https://circleci.com/gh/INazca/git-auto-download/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/download.svg)](https://npmjs.org/package/download)
[![License](https://img.shields.io/npm/l/download.svg)](https://github.com/INazca/git-auto-download/blob/master/package.json)

# Installation

# Commands

## download
### Description
With the download command you can automatically download a given csv-list of repositories to a specified folder, by default this folder is *git-repositories*. You can also prepare the repositories to download for grading. This will create a review branch and a template file to every given repository.

### Usage

####download <input.csv>
Download a list of given git-repositories into the folder *git-repositories* (either existant or will be created, name is editable in git-auto-download/download/src/settings.js). The csv-file must be formatted like that:

***format:***
path
[repository-link]
[repository-link]
[...]

***example:***
path
https://github.com/Username/repository1
https://github.com/Username/repository2
https://github.com/Username/repository3

####download <input.csv> \<template-file>
Download a list of given git-repositories into the folder *git-repositories* and prepare them for grading, meaning:
- a new branch *review* will be created in every repository
- a new file, by default called *revision.md* (editable in git-auto-download/download/src/settings.js), will be created
- the file is a copy of the template file specified as second argument of the command
