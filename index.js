#!/usr/bin/env node

var gitlog = require(__dirname + '/src/gitlog.js');
var tool = require(__dirname + '/src/tools.js')

if (require.main === module) {
    gitlog(process.argv.slice(2));
} else {
    module.exports = {
      gitlog: gitlog,
      getModifiedFiles: tool.getModifiedFiles,
      modifiedFilesFilter: tool.modifiedFilesFilter
    };
}
