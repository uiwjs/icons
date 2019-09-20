const path = require("path");
const svgtofont = require("svgtofont");
const pkg = require('../package.json');

svgtofont({
  src: path.resolve(process.cwd(), "icon"), // svg path
  dist: path.resolve(process.cwd(), "fonts"), // output path
  emptyDist: true,
  outSVGReact: true,
  outSVGPath: true,
  fontName: "w-icon", // font name
  css: true, // Create CSS files.
  startNumber: 20000, // unicode start number
  nodemo: true, // no demo html files
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  },
  website: {
    title: "uiw icons",
    // Must be a .svg format image.
    favicon: path.resolve(process.cwd(), "assets", "favicon.png"),
    logo: path.resolve(process.cwd(), "icon", "uiw.svg"),
    version: pkg.version,
    meta: {
      description: "The premium icon font for @uiw-react Component Library.",
      keywords:
        "uiw, uiw-react, react.js, react, component, svg, icon, components, ui, framework, toolkit,icon,file-icons,TTF,EOT,WOFF,WOFF2,SVG"
    },
    description: `
      The premium icon font for <a href="https://github.com/uiwjs/uiw">@uiw</a> Component Library.
    `,
    links: [
      {
        title: "Cheatsheet",
        url: "https://github.com/uiwjs/icons"
      },
      {
        title: "GitHub",
        url: "https://github.com/uiwjs/icons"
      },
      {
        title: "Feedback",
        url: "https://github.com/uiwjs/icons/issues"
      },
      {
        title: "Font Class Demo",
        url: "index.html"
      },
      {
        title: "Symbol Demo",
        url: "symbol.html"
      },
      {
        title: "Unicode Demo",
        url: "unicode.html"
      }
    ],
    footerInfo: `
      Designed by <a href="https://github.com/liwen0526">@liwen0526</a>. 
      Licensed under MIT. (Yes it's free and <a href="https://github.com/uiwjs/icons">open-sourced</a>)
    `
  }
})
.then(() => {
  console.log("done!");
});