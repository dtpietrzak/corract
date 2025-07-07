import type { RouteConfig } from "./routes/_types";

export type Mode = "dev" | "build" | "start";

export type SetupCorractOptions<Routes extends RouteConfig> = {
  routes: Routes;
  // optionally middleware, layout, etc.
};

export type PageProps<Path extends string> = {
  path: Path
}

export type Page<Path extends string = ""> = (props: PageProps<Path>) => preact.JSX.Element;

export * from "./routes/_types";
export * from "./_types/superJson";