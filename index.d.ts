type ConstructOptions = {
  target?: new () => any,
  args?: any[],
  newTarget?: new () => any,
  callback: () => void
}

export default function construct(options: ConstructOptions): any
