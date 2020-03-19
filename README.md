bit_autograder
==============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bit_autograder.svg)](https://npmjs.org/package/bit_autograder)
[![Downloads/week](https://img.shields.io/npm/dw/bit_autograder.svg)](https://npmjs.org/package/bit_autograder)
[![License](https://img.shields.io/npm/l/bit_autograder.svg)](https://github.com/wongband/bit_autograder/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bit_autograder
$ bit_autograder COMMAND
running command...
$ bit_autograder (-v|--version|version)
bit_autograder/1.0.3 darwin-x64 node-v13.10.1
$ bit_autograder --help [COMMAND]
USAGE
  $ bit_autograder COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bit_autograder help [COMMAND]`](#bit_autograder-help-command)
* [`bit_autograder login`](#bit_autograder-login)
* [`bit_autograder submit`](#bit_autograder-submit)

## `bit_autograder help [COMMAND]`

display help for bit_autograder

```
USAGE
  $ bit_autograder help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `bit_autograder login`

This command is used to login users into our LMS to submit files. 

```
USAGE
  $ bit_autograder login

DESCRIPTION
  This command is used to login users into our LMS to submit files. You must login in before submitting.
```

_See code: [src/commands/login.js](https://github.com/wongband/bit_autograder/blob/v1.0.3/src/commands/login.js)_

## `bit_autograder submit`

This is the command to submit files to our autograder. 

```
USAGE
  $ bit_autograder submit

OPTIONS
  -a, --activity=activity      (required) ID of the activity
  -c, --checkpoint=checkpoint  (required) ID of the checkpoint

DESCRIPTION
  The -c flag is used to indicate the checkpoint you are submitting to. The -a flag is used to indicate the activity 
  that you are submitting to.
  Right after that type in the files you want to send. After that the result should be displayed on the LMS and 
  terminal.
```

_See code: [src/commands/submit.js](https://github.com/wongband/bit_autograder/blob/v1.0.3/src/commands/submit.js)_
<!-- commandsstop -->
