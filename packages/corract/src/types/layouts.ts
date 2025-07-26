import type { ComponentChildren, JSX } from 'preact'
import type { MiddlewareFunction } from './middleware'
import type { SuperJsonValue } from './super-json'

export type LayoutProps = {
  children: ComponentChildren;
}

// eslint-disable-next-line no-unused-vars
export type LayoutComponent = (props: LayoutProps) => JSX.Element

export type LayoutConfig<
  // eslint-disable-next-line @stylistic/max-len
  MW extends readonly MiddlewareFunction<SuperJsonValue>[] = readonly MiddlewareFunction<SuperJsonValue>[],
> = {
  component: LayoutComponent;
  middleware?: MW;
}
