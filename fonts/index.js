const fs = require("fs");
const path = require('path');
const copy = require('copy-template-dir')
const pkg = require('../package.json')
const { readSrcPathSync } = require('./utils')
const _root = process.cwd();
const data = {};
let icon_dir = path.resolve(_root, 'icon')
let dist_dir = path.resolve(_root, 'dist')
let temp_dir = path.resolve(_root, 'build/template/site')
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