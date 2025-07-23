import { Page } from 'corract'
import { FlexRow, FlexCol, Text, Link } from 'src/components'

const DocsComponents: Page<'/docs/tools/components', AppPages> = (props) => {
  return (
    <FlexRow className={'flex-1'}>
      <FlexCol className={'flex-1 p-4 gap-5'}>
        <Text tag={'h1'} color={'black.soft'} className={'font-black text-4xl'}>
          Components
        </Text>
        <Link
          target={'_blank'}
          href={'https://preactjs.com/guide/v10/components'}
          color={'black.hard'}
        >
          All of Preact's components
        </Link>
      </FlexCol>
    </FlexRow>
  )
}

export default DocsComponents
