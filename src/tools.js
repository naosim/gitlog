var getModifiedFiles = function(data) {
  var result = [];
  data.forEach(function(commit) {
    commit.modifiedFiles.forEach(function(file) { result.push(file); });
  });
  return result;
}

var modifiedFilesFilter = function(data, filter) {
  return data.map(function(commit) { return commit.modifiedFiles = commit.modifiedFiles.filter(filter); });
}

var calcDifference = function(modifiedFiles) {
  return modifiedFiles.reduce(function(memo, file) { return memo + file.plus - file.minus; }, 0);
}

module.exports = {
  getModifiedFiles: getModifiedFiles,
  modifiedFilesFilter: modifiedFilesFilter,
  calcDifference: calcDifference
};
