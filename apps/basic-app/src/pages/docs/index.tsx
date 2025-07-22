import { Page } from 'corract'
import { FlexRow, FlexCol, Text, Link } from 'src/components'

const Docs: Page<'/docs', AppPages> = (props) => {
  return (
    <FlexRow className={'flex-1'}>
      <FlexCol className={'flex-1 p-4'}>
        <Text tag={'h1'} color={'black.hard'}>
          Text Stuff
        </Text>
      </FlexCol>
    </FlexRow>
  )
}

export default Docs
