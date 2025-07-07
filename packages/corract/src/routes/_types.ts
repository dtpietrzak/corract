import type { Request, Response } from "express";
import type { SuperJsonValue } from "../_types";

export type MiddlewareProps = {
  req: Request;
  res: Response;
};

export type MiddlewareFunction<Data extends SuperJsonValue = any> = (
  props: MiddlewareProps,
) => Promise<{
  title?: string;
  meta?: string[];
  data: Data;
}>;

export type MiddlewareReturn<T extends MiddlewareFunction> = T extends
  (...args: any[]) => Promise<infer R> ? R : never;

export type RouteConfig = Record<string, {
  middleware?: readonly MiddlewareFunction[];
  title?: string;
  meta?: string[];
}>;
