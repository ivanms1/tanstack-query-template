import * as pathToRegexp from "path-to-regexp";

export function getRoute(
  route: string,
  tokenParams: Record<string, unknown> = {}
) {
  const pathFunction = pathToRegexp.compile(route);
  return pathFunction(tokenParams);
}
