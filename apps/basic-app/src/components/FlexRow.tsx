import type { JSX } from 'corract'

export type FlexRowProps = JSX.HTMLAttributes<HTMLDivElement>

export const FlexRow = (props: FlexRowProps) => {
  const { className, ...rest } = props
  return (
    <div
      {...rest}
      className={`flex flex-row ${className}`}
    />
  )
}
