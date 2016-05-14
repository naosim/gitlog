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

module.exports = {
  getModifiedFiles: getModifiedFiles,
  modifiedFilesFilter: modifiedFilesFilter
};
