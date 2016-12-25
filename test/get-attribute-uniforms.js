var test = require('tape')
var getAttributesUniforms = require('../')

test('Parse uniforms and attributes', function (t) {
  var fragmentShader = `
  precision mediump float;

  uniform vec4 color;

  void main () {
    gl_FragColor = color;
  }`

  var vertexShader = `
  precision mediump float;

  attribute vec2 position;
  attribute vec4   foobar    ;

  void main () {
    gl_Position = vec4(position, 0, 1);
  }`

  t.deepEqual(getAttributesUniforms(fragmentShader), {
    attributes: [],
    uniforms: ['color']
  }, 'Get the attributes and uniforms for the fragment shader')

  t.deepEqual(getAttributesUniforms(vertexShader), {
    attributes: ['position', 'foobar'],
    uniforms: []
  }, 'Get the attributes and uniforms for the vertex shader')
  t.end()
})
