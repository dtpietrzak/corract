import fs from 'node:fs/promises'

export const cleanUp = async(): Promise<void> => {
  console.info('Cleaning up temporary files...')

  // Remove the temporary directory used for static HTML generation
  try {
    await fs.rm('.dist-temp', { recursive: true, force: true })
    await fs.rm('.dist/index.html', { force: true })
    console.info('Temporary files cleaned up successfully.')
  } catch(error) {
    console.error('Error cleaning up temporary files:', error)
  }
}
