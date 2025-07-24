import type { ComponentChildren, JSX } from 'preact'

export type LayoutProps = {
  children: ComponentChildren;
}

// eslint-disable-next-line no-unused-vars
export type LayoutComponent = (props: LayoutProps) => JSX.Element
