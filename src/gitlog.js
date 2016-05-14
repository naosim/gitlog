var exec = require('child_process').exec;

var format = function(data) {
  var modifiedFiles = data.filestat
    .map(function(line) {
      return line.trim().split('\t');
    })
    .map(function(ary) {
      return {
        plus: ary[0] != '-' ? parseInt(ary[0]) : null,
        minus: ary[1] != '-' ? parseInt(ary[1]) : null,
        file: ary[2]
      };
    })
    ;
  // console.log(modifiedFiles);
  return {
    authorName: data.header[0],
    authorEmail: data.header[1],
    commiterName: data.header[2],
    commiterEmail: data.header[3],
    commiteDate: data.header[4],
    hash: data.header[5],
    subject: data.subject,
    modifiedFiles: modifiedFiles,
  };
}

var containsStringInArray = function(array, value) {
  return array.filter(function(v) { return v.indexOf(value) != -1; }).length > 0;
};

var gitlog = function(optionArgs, callback) {
  optionArgs = optionArgs || [];
  if(containsStringInArray(optionArgs, '--pretty')) {
    throw new Error('cannot use "--pretty" because it is used in gitlog.');
  }
  if(containsStringInArray(optionArgs, '--numstat')) {
    throw new Error('cannot use "--numstat" because it is used in gitlog.');
  }

  var cmd = 'git log ' + optionArgs.join(' ') + ' --numstat --pretty=\'["%an", "%ae", "%cn", "%ce", "%cd", "%H"] %s\''
  exec(cmd, function(err, result) {
    var list = [];
    var currentObj = null;
    result.split('\n').forEach(function(line) {
      if(line.trim().length == 0) {
        return;
      }

      if(line.indexOf('[') == 0) {
        if(currentObj) {
          list.push(format(currentObj));
        }
        currentObj = {
          header: JSON.parse(line.slice(0, line.indexOf(']') + 1)),
          subject: line.slice(line.indexOf(']') + 1).trim(),
          filestat: []
        };
      } else {
        currentObj.filestat.push(line);
      }
    });
    list.push(format(currentObj));
    callback(list);
  });
};

module.exports = gitlog;
