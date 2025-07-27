import type { JSX } from 'corract'
import { colors } from 'src/styles'

type InternalLinkProps = {
  external?: false;
  href: AppPaths;
}

type ExternalLinkProps = {
  external: true;
  href: string;
}

type SharedProps = Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'href'> & {
  color: keyof typeof colors['link'];
}

type LinkProps = SharedProps & (InternalLinkProps | ExternalLinkProps)

export const Link = (props: LinkProps) => {
  const { color, className, ...rest } = props
  return (
    <a
      {...rest}
      className={`${colors['link'][color]} underline underline-offset-2 decoration-black/20 dark:decoration-white/20 hover:text-black hover:dark:text-white hover:decoration-black/80 hover:dark:decoration-white/80 decoration-2 transition-colors ${className}`}
    />
  )
}
