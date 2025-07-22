import { type AnchorHTMLAttributes } from 'preact/compat'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: LinkProps) => {
  return (
    <a
      {...props}
      className={`text-slate-800 dark:text-slate-200 underline ${props.className}`}
    />
  )
}
