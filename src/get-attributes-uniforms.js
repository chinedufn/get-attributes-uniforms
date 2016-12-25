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
      attrsAndUniforms.attributes.push(
        // Find the token that comes two spots after our `attribute`
        statement.trim().replace('\n', ' ').split(/[ ]+/)[2]
      )
    } else if (uniformLocation !== -1) {
      attrsAndUniforms.uniforms.push(
        // Find the token that comes two spots after our `uniform`
        statement.trim().replace('\n', ' ').split(/[ ]+/)[2]
      )
    }

    return attrsAndUniforms
  }, {attributes: [], uniforms: []})
}
