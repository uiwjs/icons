const ghpages = require('gh-pages');
const path = require('path');
const loading = require('loading-cli');
require('colors-cli/toxic');
const pkg = require('../package.json');

const ORIGIN = "git@github.com:uiwjs/icons.git";
const BRANCH = 'gh-pages';

console.log('  Start public to your git repo'.green);
console.log(`  ${ORIGIN}\n`.green);
const load = loading({
  text: 'Please wait ...'.blue,
  color: 'blue',
  interval: 100,
  stream: process.stdout,
}).start();

ghpages.publish(
  path.resolve(path.join(process.cwd(), "fonts")),
  {
    branch: BRANCH,
    repo: ORIGIN,
    message: `Update uiw-iconfont v${pkg.version} document. ${new Date()}!`
  },
  err => {
    load.stop();
    if (err) {
      return console.log(err);
    }
    console.log(`\n Push to ${BRANCH} success!\n`.green.bold);
  }
);
