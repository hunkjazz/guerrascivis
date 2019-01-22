// Utilities
const { src, dest, series, parallel } = require('../utilities/api');
const { pathTo } = require('../utilities/paths');

// Dependency tasks
const { cleanBuild } = require('./folderCleaner');
const { generateCode } = require('./codeGenerator');

// Tasks
function copyStaticFiles() {

  return src(pathTo.staticFiles)
          .pipe(dest('build/'));
}

const buildFiles = series(
                    cleanBuild, 
                    parallel(copyStaticFiles, generateCode)
                  );

module.exports = {
  buildFiles,
  copyStaticFiles
}