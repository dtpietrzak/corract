import { Page } from 'corract'
import { FlexRow, FlexCol, Text, Link } from 'src/components'

const DocsHooks: Page<'/docs/tools/hooks', AppPages> = (props) => {
  return (
    <FlexRow className={'flex-1'}>
      <FlexCol className={'flex-1 p-4 gap-5'}>
        <Text tag={'h1'} color={'black.soft'} className={'font-black text-4xl'}>
          Hooks
        </Text>
        <Text tag={'p'} color={'black.hard'}>
          useServerState()
        </Text>
        <Link
          target={'_blank'}
          href={'https://preactjs.com/guide/v10/hooks'}
          color={'black.hard'}
        >
          All of Preact's hooks
        </Link>
      </FlexCol>
    </FlexRow>
  )
}

export default DocsHooks
