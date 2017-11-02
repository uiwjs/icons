

const fs = require("fs");
const path = require('path');
const copy = require('copy-template-dir')
const pkg = require('../package.json')
const _root = process.cwd();
const data = {};


let icon_dir = path.resolve(_root, 'icon')
let dist_dir = path.resolve(_root, 'dist')
let temp_dir = path.resolve(_root, 'build/template')
//检查指定路径的文件或者目录是否存在
function exists(path) {
  return fs.existsSync(path);
}
//判断是不是目录
function isDir(path) {
  return exists(path) && fs.statSync(path).isDirectory();
}
//返回所有路径的 Array
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

let logo = '';

const html = readSrcPathSync(icon_dir).map((item, idx) => {
  let name = path.basename(item, '.svg');
  let _path = item.replace(icon_dir, '');
  _path = path.join('./icon', _path);
  var svgcode = fs.readFileSync(item, "utf-8").replace('fill="#555"', '').replace('fill="#000"', '');
  if (name === 'uiw') {
    logo = svgcode
  }
  return `<li>${svgcode.toString()}<h4>${name}</h4></li>`
})

const vars = { content: html.join(''), logo, version: pkg.version }

copy(temp_dir, dist_dir, vars, (err, createdFiles) => {
  if (err) throw err
  createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
  console.log('copy template done!')
  copy(icon_dir, path.resolve(dist_dir, 'icon'), vars, (err, createdFiles) => {
    if (err) throw err
    createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
    console.log('copy svg icon done!')
  })
})