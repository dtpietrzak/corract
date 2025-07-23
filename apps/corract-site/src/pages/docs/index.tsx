import { Page } from 'corract'
import { FlexRow, FlexCol, Text, Link } from 'src/components'

const Docs: Page<'/docs', AppPages> = (props) => {
  return (
    <FlexRow className={'flex-1'}>
      <FlexCol className={'flex-1 p-4 gap-5'}>
        <Text tag={'h1'} color={'black.soft'} className={'font-black text-4xl'}>
          Overview
        </Text>
      </FlexCol>
    </FlexRow>
  )
}

export default Docs
