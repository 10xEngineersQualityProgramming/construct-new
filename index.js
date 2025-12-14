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
var _return = require('@_immo/return')
var intrinsic = require('get-intrinsic')
var reflectconstruct = intrinsic('%Reflect.construct%')
var objcreate = intrinsic('%Object.create%')

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
  if (!isConstructable(target)) {
    immediateError("Target must be callable with the new operator when constructing a new instance of an object.", ErrorType.TypeError)
  }
  if (!isArray(args) && !isArguments(args)) {
    immediateError("Arguments must be an array or arguments object.", ErrorType.TypeError)
  }
  if (!isConstructable(newTarget)) {
    immediateError("newTarget must be callable with the new operator when constructing a new instance of an object if it is specified.", ErrorType.TypeError)
  }
  if (!isFunction(callback)) {
    immediateError("Callback must be a function when constructing a new instance of an object if it is specified.", ErrorType.TypeError)
  }
	var result
  if (isES2015 === myTrueValue) {
    result = reflectconstruct(target, args, newTarget)
  } else {
    result = target.apply(objcreate(target.prototype), args)
  }
  callback(result)
  return _return(result)
}

module.exports = construct
