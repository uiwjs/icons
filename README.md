<p align="center">
  <a href="https://uiwjs.github.io/icons">
    <img width="150" src="https://raw.githubusercontent.com/uiwjs/icons/master/assets/logo.svg?sanitize=true">
  </a>
</p>


@uiw/icons
===

[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/icons.svg?style=flat)](https://www.npmjs.com/package/@uiw/icons)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@uiw/icons/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@uiw/icons)
[![releases version](https://img.shields.io/github/release/uiwjs/icons.svg)](https://github.com/uiwjs/icons/releases)
[![LICENSE](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/uiwjs/icons)
[![NPM Version](https://img.shields.io/npm/v/@uiw/icons.svg)](https://www.npmjs.com/package/@uiw/icons)

The premium icon font for [uiwjs](https://github.com/uiwjs) Component Library. Designed [`@uiw/icons`](https://uiwjs.github.io/icons/design/) by [@liwen0526](https://github.com/liwen0526). 

Visit **[https://uiwjs.github.io/icons/](https://uiwjs.github.io/icons/)** and check out the search feature, which has keywords identifying common icon names and styles. For example, if you search for "arrow" we call up every icon that could possibly be used as an arrow. We've also included each icon's class name for easy copy / pasting when you're developing!

They are free to use and licensed under [MIT](https://opensource.org/licenses/MIT). We intend for this icon pack to be used with [uiw](https://uiwjs.github.io), but it’s by no means limited to it. Use them wherever you see fit, personal or commercial. 

<p align="center">
  <a href="https://uiwjs.github.io/icons">
    <img src="https://github.com/uiwjs/icons/raw/master/assets/uiw-font.png">
  </a>
</p>

## Installation

```bash
npm install @uiw/icons --save
```

## HTML Example

You can use [https://uiwjs.github.io/icons/](https://uiwjs.github.io/icons/) to easily find the icon you want to use. Once you've copied the desired icon's CSS classname, simply add the icon and icon's classname, such as `apple` to an HTML element.

You need link CSS

```html
<link rel="stylesheet" type="text/css" href="node_modules/@uiw/icons/w-icon.css">
```

**Used in Less:**

```css
@import "~@uiw/icons/fonts/w-icon.css";
```

**Used in JS:**

```js
import '@uiw/icons/fonts/w-icon.css';
// or
import '@uiw/icons/fonts/w-icon.less';
```

note: It has a `w-icon-` prefix. 

```html
<i class="w-icon-apple"></i>
```

Or use the `Unicode`, You can use [Unicode website](https://uiwjs.github.io/icons/unicode.html) to easily find the `Unicode` icon you want to use. 

```html
<style>
.iconfont{
  font-family: "w-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<span class="iconfont">&#59907;</span>
```

Or manually download and link `**@uiw/icons**` in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/@uiw/icons/):

```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@uiw/icons/fonts/w-icon.css">
<span class="w-icon-adobe"></span>
```

**In Webpack**

```js
{
  test: /w-icon\.(eot|ttf|svg)$/,
  use: [
    {
      loader: require.resolve('url-loader'),
      options: { limit: 8192 }
    },
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/fonts/[name].[hash:8].[ext]',
      }
    }
  ]
},
```

## Used in React

Icons are used as components. `v2.6.2+` support.

```jsx
import { Adobe, Alipay } from '@uiw/icons';
import { Alipay } from '@uiw/icons/Alipay';

<Adobe style={{ fill: 'red' }} />
<Alipay height="36" />
```

To use SVG images as React components directly, webpack loader support is required.

Install dependencies:

```bash
yarn add @svgr/webpack file-loader
```

Configure webpack loader:

```js
// webpack.config.js
{
  test: /\.svg$/,
  use: [
    {
      loader: require.resolve('@svgr/webpack'),
      options: {
        prettier: false,
        svgo: false,
        svgoConfig: {
          plugins: [{ removeViewBox: false }],
        },
        titleProp: true,
        ref: true,
      },
    },
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[hash].[ext]',
      },
    },
  ],
  issuer: {
    and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
  },
},
```

You can then import the SVG as a React component like this:

```javascript
import { ReactComponent as ComLogo } from '@uiw/icons/icon/alipay.svg';

<ComLogo />
```

**Custom Icon Component**

Create an `Icon` component.

```jsx
import React from 'react';
import svgPaths from '@uiw/icons/fonts/w-icon.json';

const renderSvgPaths = (type) => {
  const pathStrings = svgPaths[type];
  if (pathStrings == null) {
    return null
  }
  return pathStrings.map((d, i) => <path key={i} d={d} fillRule="evenodd" />)
}

export default class Icon extends React.PureComponent {
  render() {
    const { type, color } = this.props;
    if (type == null || typeof type === "boolean") {
      return null;
    }
    return (
      <svg fill={color} viewBox={`0 0 24 24`}>{this.renderSvgPaths(type)}</svg>
    );
  }
}
```

Use the `Icon` component:

```jsx
const demo = () => {
  return (
    <Icon type="heart-on" />
  )
}
```

## Development

Run the `npm install` to install the dependencies after cloning the project and you'll be able to:

To build `*.svg` `*.ttf` `*.woff` `*.eot` files

```bash
npm run font
```

To build site and push gh-pages branch

```bash
npm run start
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/icons/graphs/contributors">
  <img src="https://uiwjs.github.io/icons/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Created By [svgtofont](https://github.com/jaywcjlove/svgtofont), Licensed under the [MIT License](https://opensource.org/licenses/MIT).
