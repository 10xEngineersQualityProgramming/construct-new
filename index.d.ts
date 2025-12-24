type ConstructOptions = {
  target?: new () => any,
  args?: any[],
  newTarget?: new () => any,
  callback: () => void
}

function construct(options: ConstructOptions): any

export = construct
