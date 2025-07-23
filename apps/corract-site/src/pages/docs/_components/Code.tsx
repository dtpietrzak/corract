import { Children } from 'corract'

export type CodeProps = {
  children: Children;
}

export const Code = (props: CodeProps) => {
  return (
    <code className={`inline-code`}>
      {props.children}
    </code>
  )
}
