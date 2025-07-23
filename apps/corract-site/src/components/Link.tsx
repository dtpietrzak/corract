import type { JSX } from 'corract'
import { colors } from 'src/styles'

export type LinkProps = {
  color: keyof typeof colors['link'];
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: LinkProps) => {
  const { color, className, ...rest } = props
  return (
    <a
      {...rest}
      className={`${colors['link'][color]} underline underline-offset-2 decoration-black/20 dark:decoration-white/20 hover:text-black hover:dark:text-white hover:decoration-black/80 hover:dark:decoration-white/80 decoration-2 transition-colors ${className}`}
    />
  )
}
