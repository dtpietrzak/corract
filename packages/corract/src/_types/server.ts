import type { Request } from 'express'
import type { SuperJsonValue } from './super-json'

export interface CorractRequest extends Request {
  __SSR_DATA__?: Record<string, SuperJsonValue>;
}
