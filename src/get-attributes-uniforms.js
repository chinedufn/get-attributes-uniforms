module.exports = getAttributesUniforms

// Given a fragment or vertex shader we
// return all of the attributes and uniforms
//  One potential use case is to use this
//  information when getting a shader's
//  uniform and attribute locations
function getAttributesUniforms (shaderString) {
  // All attribute and uniform definitions come before
  // the void statement
  var voidIndex = shaderString.indexOf(' void ')

  var shaderBeforeVoid = shaderString.substring(0, voidIndex)

  // Split the shader into individual statements
  var shaderStatements = shaderBeforeVoid.split(';')

  // Find all of the uniforms and attributes
  return shaderStatements.reduce(function (attrsAndUniforms, statement) {
    var attribLocation = statement.indexOf(' attribute ')
    var uniformLocation = statement.indexOf(' uniform ')

    // If we have an attribute or a uniform in this statement we add it to our list
    if (attribLocation !== -1) {
      // Tokenize the attribute declaration.. ex: [attribute, vec3, position]
      var attributeStatementTokens = statement.trim().replace('\n', ' ').split(/[ ]+/)
      // The token that is one spot after `attribute` is the type (ex: vec2, vec4, ... etc)
      // The token that comes two spots after our `attribute` is the name (ex: aVertexPosition, aVertexNormal...)
      // So this turns into ex: attributes['position'] = 'vec3'
      attrsAndUniforms.attributes[attributeStatementTokens[2]] = attributeStatementTokens[1]
    } else if (uniformLocation !== -1) {
      var uniformStatementTokens = statement.trim().replace('\n', ' ').split(/[ ]+/)
      // The token that is one spot after `uniform` is the type (ex: vec2, vec4, ... etc)
      // Find the token that comes two spots after our `uniform` (the name)
      attrsAndUniforms.uniforms[uniformStatementTokens[2]] = uniformStatementTokens[1]
    }

    return attrsAndUniforms
  }, {attributes: {}, uniforms: {}})
}
