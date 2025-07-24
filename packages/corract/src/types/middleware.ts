import type { Response } from 'express'
import type { SuperJsonValue } from './super-json'
import type { CorractRequest } from './server'

export type MiddlewareProps = {
  req: CorractRequest;
  res: Response;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MiddlewareFunction<Data extends SuperJsonValue = any> = (
  // eslint-disable-next-line no-unused-vars
  props: MiddlewareProps,
) => Promise<{
  title?: string;
  meta?: string[];
  data: Data;
}>

export type MiddlewareReturn<T extends MiddlewareFunction> = T extends
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
(...args: any[]) => Promise<infer R> ? R : never
