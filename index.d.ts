type ConstructOptions = {
  target?: new () => any,
  args?: any[],
  newTarget?: new () => any,
  callback: () => void
}

export = function construct(options: ConstructOptions): any
