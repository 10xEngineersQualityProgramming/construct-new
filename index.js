
function construct({
  target,
  args,
  newTarget,
  callback
}) {
  return require("construct-new-second")(target, args, newTarget, callback)
}

module.exports = construct
