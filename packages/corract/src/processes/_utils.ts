import path from 'node:path'
import fs from 'node:fs/promises'

export async function forceWriteFile(filePath: string, data: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, data)
}
