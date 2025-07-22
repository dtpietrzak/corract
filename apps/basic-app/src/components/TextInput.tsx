import type { JSX } from 'corract'
import { colors } from 'src/styles'

export type TextInputProps = {
  color: keyof typeof colors['search'];
} & JSX.InputHTMLAttributes<HTMLInputElement>

export const TextInput = (props: TextInputProps) => {
  const { color, className, ...rest } = props

  return (
    <input
      {...rest}
      className={`${colors['search'][color]} w-full pl-4 pr-2 py-1.5 text-pretty text-[15px] rounded-2xl border ${className}`}
    />
  )
}
