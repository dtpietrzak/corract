import type { Request } from 'express'
import { MiddlewareResult } from './middleware'

export interface CorractRequest extends Request {
  __SSR_DATA__?: Record<string, MiddlewareResult>;
  __RENDER_AT_RUNTIME__?: boolean;
  __MIDDLEWARE_LENGTH__?: number;
}
