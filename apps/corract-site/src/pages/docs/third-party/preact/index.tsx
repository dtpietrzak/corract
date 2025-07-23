import { Page } from 'corract'
import { FlexRow, FlexCol, Text, Link } from 'src/components'

const DocsPreact: Page<'/docs/third-party/preact', AppPages> = (props) => {
  return (
    <FlexRow className={'flex-1'}>
      <FlexCol className={'flex-1 p-4 gap-5'}>
        <Text tag={'h1'} color={'black.soft'} className={'font-black text-4xl'}>
          Preact
        </Text>
        <Link
          target={'_blank'}
          href={'https://preactjs.com/guide/v10/getting-started'}
          color={'black.hard'}
        >
          Check out Preact's documentation
        </Link>
      </FlexCol>
    </FlexRow>
  )
}

export default DocsPreact
