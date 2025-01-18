'use client'

export const TurnOffDefaultPropsWarning = () => {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in the recharts library
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return
    error(...args)
  }

  return <div className="absolute h-0 w-0"></div>
}
