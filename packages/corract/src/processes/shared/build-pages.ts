import type { PagesConfigExtended } from 'src/types'

import fs from 'node:fs/promises'
import { fileExists } from '../_utils'

export const buildPages = async(props: {
  extendedPagesConfig: PagesConfigExtended;
}) => {
  await Promise.all(Object.keys(props.extendedPagesConfig).map(async(pagePath) => {
    const pathParts = pagePath.split('/')
    const sanitizedPath = pathParts.map((pathPart) => {
      if (pathPart.startsWith(':')) return `[${pathPart.slice(1)}]`
      return pathPart
    }).join('/')
    // check if file already exists
    const filePath = `src/pages${sanitizedPath}/index.tsx`
    console.info(`Checking if file exists: ${filePath}`)

    if (await fileExists(filePath)) return
    console.info(`File does not exist, generating: ${filePath}`)

    // Ensure the directory exists
    const dirPath = `src/pages${sanitizedPath}`

    console.info(`Ensuring directory exists: ${dirPath}`)
    await fs.mkdir(dirPath, { recursive: true })
    console.info(`Generating page at: ${filePath}`)

    // Create the page template
    const pageTemplate = `import { Page } from 'corract'

const MyPage: Page<'${pagePath}', AppPages> = (props) => {
  return (
    <>
      <h1>My Page</h1>
      <a href="/">Go Home</a>
    </>
  )
}

export default MyPage
`

    await fs.writeFile(filePath, pageTemplate)
  }))
}
