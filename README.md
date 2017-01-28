get-attributes-uniforms [![npm version](https://badge.fury.io/js/get-attributes-uniforms.svg)](http://badge.fury.io/js/get-attributes-uniforms) [![Build Status](https://travis-ci.org/chinedufn/get-attributes-uniforms.svg?branch=master)](https://travis-ci.org/chinedufn/get-attributes-uniforms)
===============

> Get the uniforms and attributes from a GLSL shader string

## Background / Initial Motivation

The initial motivation for `get-attributes-uniforms` was to be used in the browser during runtime
when getting attribute and uniform locations from a shader
(i.e. calling `getAttribLocation` & `getUniformLocation`).

We want `get-attributes-uniforms` to be tiny since it intends to run in the browser,
so instead of depending on a powerful but large glsl AST parser we use the
native string functions.

In short.. we just chop out the uniform and attribute names based on our knowledge of the GLSL syntax.

## Notes

This API does not use an AST and could very well be overlooking an edge case.
If you run into one, feel super free to [open an issue](https://github.com/chinedufn/get-attributes-uniforms/issues)
or [open a PR with a test case](https://github.com/chinedufn/get-attributes-uniforms/pulls).

## To Install

```sh
$ npm install --save get-attributes-uniforms
```

Changes to the `demo` and `src` files will now live reload in your browser.

## Usage

```js
var getAttributesUniformss = require('get-attributes-uniforms')

var fragmentShader = `
precision mediump float;

attribute mat4      someAttrib;
uniform vec4 color;

void main () {
  gl_FragColor = color;
}
`

var vertexShader = `
precision mediump float;

attribute vec2 position;
attribute vec4   foobar    ;

void main () {
  gl_Position = vec4(position, 0, 1);
}
`

console.log(getAttributesUniforms(fragmentShader))
// { attributes: {someAttrib: 'mat4'}, uniforms: {color: 'vec4' } }

console.log(getAttributesUniforms(vertexShader))
// { attributes: {position: 'vec2', foobar: 'vec4'}, uniforms: {} }
```
## API

### `getAttributesUniforms(shaderString)` -> `Object`

#### shaderString

Type: `String`

A string representing a vertex or fragment shader.

```js
var shaderString = `
precision mediump float;

attribute vec3 position;

void main() {
// ...
}
`
```

## TODO:

- [ ] Fix when shader code has comments above a uniform. Somehow got a uniform back called `uniform`

## See Also

- [stackgl/glsl-extract](https://github.com/stackgl/glsl-extract)

## License

MIT
