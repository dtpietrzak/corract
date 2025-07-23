import { Children } from 'corract'
import { colors } from 'src/styles'

export type CodeBlockProps = {
  children: Children;
  language: string;
}

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <pre className={'bg-gray-500/25 rounded-2xl px-5 py-3'}>
      <code className={`language-${props.language} ${colors['text']['black.soft']} text-xs`}>
        {props.children}
      </code>
    </pre>
  )
}
