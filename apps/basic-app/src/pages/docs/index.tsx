import { Page } from 'corract'
import { FlexCol, Text } from 'src/components'

const Docs: Page<'/docs', AppPages> = (props) => {
  return (
    <FlexCol className={'flex-1 p-4'}>
      <Text tag={'h1'} color={'black.hard'}>
        Text Stuff
      </Text>
    </FlexCol>
  )
}

export default Docs
