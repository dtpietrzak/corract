import type { JSX } from 'corract'
import { colors } from 'src/styles'

type TagElementMap = {
  p: JSX.HTMLAttributes<HTMLParagraphElement>;
  span: JSX.HTMLAttributes<HTMLSpanElement>;
  div: JSX.HTMLAttributes<HTMLDivElement>;
  li: JSX.LiHTMLAttributes<HTMLLIElement>;
  h1: JSX.HTMLAttributes<HTMLHeadingElement>;
  h2: JSX.HTMLAttributes<HTMLHeadingElement>;
  h3: JSX.HTMLAttributes<HTMLHeadingElement>;
  h4: JSX.HTMLAttributes<HTMLHeadingElement>;
  h5: JSX.HTMLAttributes<HTMLHeadingElement>;
  h6: JSX.HTMLAttributes<HTMLHeadingElement>;
}

type AllowedTags = keyof TagElementMap

type TextProps<T extends AllowedTags> = {
  tag: T;
  color: keyof typeof colors['text'];
} & TagElementMap[T]

export const Text = <T extends AllowedTags>(props: TextProps<T>) => {
  const { tag: Tag, children, color, className, ...rest } = props
  return (
    // @ts-ignore: TypeScript doesn't infer the tag type correctly
    <Tag
      {...rest}
      className={`${colors['text'][color]} ${className}`}
    >
      {children}
    </Tag>
  )
}
