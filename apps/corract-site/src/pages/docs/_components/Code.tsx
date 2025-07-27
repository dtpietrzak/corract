import { Children } from 'corract'

export type CodeProps = {
  children: Children;
}

export const Code = (props: CodeProps) => {
  return (
    <code className={`inline-code`}>
      <span style={{
        fontSize: '0.85em',
      }}
      >
        {props.children}
      </span>
    </code>
  )
}
