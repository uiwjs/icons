const fs = require('fs');
const ttf2eot = require('ttf2eot');
const ttf2woff = require('ttf2woff');
const svg2ttf = require('svg2ttf');

/**
 * ttf 2 eot
 * 
 * @param {String} infile 
 * @param {String} outfile 
 */
function ttfEot(infile, outfile) {
  let input, size;

  try {
    if (infile) {
      input = fs.readFileSync(infile);
    } else {
      size = fs.fstatSync(process.stdin.fd).size;
      input = new Buffer(size);
      fs.readSync(process.stdin.fd, input, 0, size, 0);
    }
  } catch (e) {
    console.error("Can't open input file (%s)", infile || 'stdin');
    process.exit(1);
  }

  let ttf = new Uint8Array(input);
  let eot = new Buffer(ttf2eot(ttf).buffer);

  if (outfile) {
    fs.writeFileSync(outfile, eot);
    console.log("eot Font successfully created!")
  } else {
    process.stdout.write(eot);
  }
}


function ttfWoff(infile, outfile) {
  let input, size;
  try {
    if (infile) {
      input = fs.readFileSync(infile);
    } else {
      size = fs.fstatSync(process.stdin.fd).size;
      input = new Buffer(size);
      fs.readSync(process.stdin.fd, input, 0, size, 0);
    }
  } catch (e) {
    console.error("Can't open input file (%s)", infile || 'stdin');
    process.exit(1);
  }

  let ttf = new Uint8Array(input);
  let woff = new Buffer(ttf2woff(ttf).buffer);

  if (outfile) {
    fs.writeFileSync(outfile, woff);
    console.log("woff Font successfully created!")
  } else {
    process.stdout.write(woff);
  }
}

function svgTtf(infile, outfile) {
  let input, size;
  try {
    let ttf = svg2ttf(fs.readFileSync(infile, 'utf8'));
    fs.writeFileSync(outfile, new Buffer(ttf.buffer));
    console.log("ttf Font successfully created!")
  } catch (e) {
    console.error("Can't open input file (%s)", infile || 'stdin');
    process.exit(1);
  }
}

module.exports = {
  ttfEot,
  ttfWoff,
  svgTtf
}