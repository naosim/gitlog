var isRootData = function(v) {
  return v.length == 0 || v[0].hash;
}

var getModifiedFiles = function(data) {
  var result = [];
  data.forEach(function(commit) {
    commit.modifiedFiles.forEach(function(file) { result.push(file); });
  });
  return result;
};


var cloneMap = function(map) {
  var result = {};
  Object.keys(map).forEach(function(key) { result[key] = map[key]; });
  return result;
}

var modifiedFilesFilter = function(data, filter) {
  if(data.length == 0) {
    return [];
  }
  if(isRootData(data)) {
    return data.map(function(commit) {
      var result = cloneMap(commit);
      result.modifiedFiles = result.modifiedFiles.filter(filter);
      return result;
    });
  } else {
    return data.filter(filter);
  }
};

var modifiedFilesFilterByName = function(data, value) {
  return modifiedFilesFilter(data, function(modifiedFile) {
    return modifiedFile.file.indexOf(value) != -1;
  });
};

var calcDifference = function(modifiedFiles) {
  if(isRootData(modifiedFiles)) {
    modifiedFiles = getModifiedFiles(modifiedFiles);
  }
  return modifiedFiles.reduce(function(memo, file) { return memo + file.plus - file.minus; }, 0);
};

module.exports = {
  getModifiedFiles: getModifiedFiles,
  modifiedFilesFilter: modifiedFilesFilter,
  modifiedFilesFilterByName: modifiedFilesFilterByName,
  calcDifference: calcDifference,
};
