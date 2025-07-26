import path from 'node:path'
import fs from 'node:fs/promises'

export async function forceWriteFile(filePath: string, data: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, data)
}

export async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}
