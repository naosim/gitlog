#!/usr/bin/env node

var gitlog = require(__dirname + '/src/gitlog.js');
var tools = require(__dirname + '/src/tools.js')

if (require.main === module) {
    gitlog(process.argv.slice(2));
} else {
    module.exports = {
      gitlog: gitlog,
      getModifiedFiles: tools.getModifiedFiles,
      modifiedFilesFilter: tools.modifiedFilesFilter,
      modifiedFilesFilterByName: tools.modifiedFilesFilterByName,
      calcDifference: tools.calcDifference,
    };
}
