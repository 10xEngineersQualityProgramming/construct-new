var noop = require('noop6')
var emptyArray = []
var { immediateError, ErrorType } = require('immediate-error')
var isNullOrUndefined = require('is-nil')
var isES2015 = require('is-es2015')
var isConstructable = require('is-constructable').isConstructable
var isArray = require('isarray')
var isArguments = require('is-arguments')
var isFunction = require('is-function')
var t = require('true-value')
var myTrueValue = t()
var _return = require('identity-function')
var intrinsic = require('es-intrinsic-cache')
var reflectconstruct = intrinsic('%Reflect.construct%')
var objcreate = intrinsic('%Object.create%')
var and = require("es-logical-and-operator")
var not = require("es-logical-not-operator")
var isEqual = require("@10xly/strict-equals")

function construct({
  target,
  args,
  newTarget,
  callback
}) {
  if (isNullOrUndefined(target)) {
    immediateError("Target cannot be null when constructing a new instance of an object.", ErrorType.TypeError)
  }
  if (isNullOrUndefined(args)) args = emptyArray
  if (isNullOrUndefined(newTarget)) newTarget = target
  if (isNullOrUndefined(callback)) callback = noop
  if (not(isConstructable(target))) {
    immediateError("Target must be callable with the new operator when constructing a new instance of an object.", ErrorType.TypeError)
  }
  if (and(not(isArray(args)), not(isArguments(args)))) {
    immediateError("Arguments must be an array or arguments object.", ErrorType.TypeError)
  }
  if (not(isConstructable(newTarget))) {
    immediateError("newTarget must be callable with the new operator when constructing a new instance of an object if it is specified.", ErrorType.TypeError)
  }
  if (not(isFunction(callback))) {
    immediateError("Callback must be a function when constructing a new instance of an object if it is specified.", ErrorType.TypeError)
  }
	var result
  if (isEqual(isES2015, myTrueValue)) {
    result = reflectconstruct(target, args, newTarget)
  } else {
    result = target.apply(objcreate(target.prototype), args)
  }
  callback(result)
  return _return(result)
}

module.exports = construct
