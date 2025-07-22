import type { JSX } from 'corract'

export type FlexColProps = JSX.HTMLAttributes<HTMLDivElement>

export const FlexCol = (props: FlexColProps) => {
  const { className, ...rest } = props
  return (
    <div
      {...rest}
      className={`flex flex-col ${className}`}
    />
  )
}
