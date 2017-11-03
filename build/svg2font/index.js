const fs = require("fs");
const path = require("path");
const querystring = require('querystring');
const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const defaultMetadataProvider = require('svgicons2svgfont/src/metadata');
const pkg = require('../../package.json')

var codePointAt = require('code-point-at');

const { ttfEot, ttfWoff, svgTtf } = require('./ttf2eot');

const copy = require('copy-template-dir');
const { readSrcPathSync, string2unicodes } = require('../utils');

const _root = process.cwd();
const icon_dir = path.resolve(_root, 'icon')
const font_dir = path.resolve(_root, 'fonts')
const fontname = 'w-iconfont';
const icon_svg_font = path.resolve(_root, `fonts/${fontname}.svg`)
const icon_ttf_font = path.resolve(_root, `fonts/${fontname}.ttf`)
const icon_woff_font = path.resolve(_root, `fonts/${fontname}.woff`)
const icon_eot_font = path.resolve(_root, `fonts/${fontname}.eot`)
const font_temp = path.resolve(_root, `build/template`)
let unicode_html = [];
let metadataProvider;
let logohtml = '';
let cssIconHtml = [];
let cssString = [];

function createOtherFont() {
  svgTtf(icon_svg_font, icon_ttf_font);
  ttfWoff(icon_ttf_font, icon_woff_font);
  ttfEot(icon_ttf_font, icon_eot_font);
}

/**
 * 生成SVG字体
 */
function svgFont() {
  const fontStream = new SVGIcons2SVGFontStream({
    fontName: fontname,
    normalize: true,
    fontHeight: 1000,
  });

  fontStream.pipe(fs.createWriteStream(icon_svg_font))
    .on('finish', function () {
      console.log('SVG Font successfully created!')
      createOtherFont()
    })
    .on('error', function (err) {
      console.log(err);
    });

  /**
   * Unicode Private Use Area start.
   * http://en.wikipedia.org/wiki/Private_Use_(Unicode)
   */
  let startUnicode = 0xEA01;
  readSrcPathSync(icon_dir).forEach((item, idx) => {
    let glyph = fs.createReadStream(item);
    let name = path.basename(item, path.extname(item))
    let unicode = String.fromCharCode(startUnicode++)
    let ligature = '';
    for (let i = 0; i < name.length; i++) {
      ligature += String.fromCharCode(name.charCodeAt(i))
    }
    glyph.metadata = {
      name: name,
      unicode: [unicode, name]
    }
    if (name === 'uiw') {
      logohtml = fs.readFileSync(item, "utf-8");
    }

    let aaa = codePointAt(name)
    cssString.push(`.w-icon-${name}:before { content: "${unicode.toString(16)}"; }`);

    // cssString.push('  "' + name + '": "' + unicodes + '"' + ((idx === icon_dir.length - 1) ? '' : ',') + '\n');

    cssIconHtml.push(`<li><i class="w-icon-${name}"></i><p class="name">${name}</p></li>`)


    // unicode_html.push(`<li class="icon"><span class="iconfont">&#${string2unicodes(unicode).join('')};</span><p class="name">${name}</p><span class="unicode">&amp;#${string2unicodes(unicode).join('')};</span></li>`)
    unicode_html.push(`<li><span class="iconfont unicode-icon">&#${string2unicodes(unicode).join('')};</span><h4>${name}</h4><span class="unicode">&amp;#${string2unicodes(unicode).join('')};</span></li>`)

    metadataProvider = defaultMetadataProvider({
      startUnicode: startUnicode,
      prependUnicode: false,
    })
    fontStream.write(glyph)
  });
  fontStream.end()
  console.log("SVG Font successfully created!")
}


svgFont()


copy(font_temp, font_dir, {
  fontname: fontname,
  unicode: unicode_html.join(''),
  version: pkg.version,
  svg_content: '',
  logosvg: logohtml,
  cssString: cssString.join(''),
  cssIconHtml: cssIconHtml.join(''),
}, (err, createdFiles) => {
  if (err) throw err
  console.log('')
  createdFiles.forEach(filePath => console.log(`Created ${filePath} `))
  console.log('')
  console.log('copy svg icon done!')
})

