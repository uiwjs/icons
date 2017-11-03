const fs = require("fs");
const path = require('path');

/**
 * 返回所有svg路径的 Array
 * 
 * @param  {string} filepath string
 * @return {Array}      unicodes
 */
function readSrcPathSync(filepath, ret) {
  var ret = ret || [],
    files = fs.readdirSync(filepath);
  for (var i = 0; i < files.length; i++) {
    let curPath = path.resolve(filepath, files[i]);
    if (isDir(curPath)) ret.concat(readSrcPathSync(curPath, ret));
    else if (/\.(svg)$/.test(curPath)) {
      ret.push(curPath);
    }
  }
  return ret;
}

/**
 * 检查指定路径的文件或者目录是否存在
 * 
 * @param  {string} path string
 */
function exists(path) {
  return fs.existsSync(path);
}
/**
 * 判断是不是目录
 * 
 * @param  {string} path string
 */
function isDir(path) {
  return exists(path) && fs.statSync(path).isDirectory();
}

/**
 * string to unicodes
 *
 * @param  {string} str string
 * @return {Array}      unicodes
 */
function string2unicodes(str) {
  return str.split('').map(function (text) {
    return text.charCodeAt(0);
  });
}


function toBuffer(infile, cb) {
  let input, size;
  try {
    if (infile) {
      input = fs.readFileSync(infile);
    } else {
      size = fs.fstatSync(process.stdin.fd).size;
      input = new Buffer(size);
      fs.readSync(process.stdin.fd, input, 0, size, 0);
    }
    cb && cb(input);
  } catch (e) {
    console.error("Can't open input file (%s)", infile || 'stdin');
    process.exit(1);
  }
}

module.exports = {
  toBuffer,
  string2unicodes,
  isDir,
  exists,
  readSrcPathSync
}