import DOMPurify from "dompurify";

type RouteCallback = (
  errorElement?: HTMLElement,
  params?: Record<string, string>
) => void;

interface RouteConfig {
  path: string;
  routeto?: string; // New property for redirection
  element: RouteCallback;
  errorElement?: RouteCallback;
  children?: RouteConfig[];
  params?: Record<string, string>;
}

export class TSRouter {
  private routes: RouteConfig[] = [];
  private expectedParams?: Set<string>;

  constructor(routes: RouteConfig[], expectedParams: string[]) {
    this.routes = routes;
    this.expectedParams = new Set(expectedParams);
    window.addEventListener("popstate", this.handlePopState.bind(this));
    this.handlePopState(); // Initial handling of current state
  }

  private handlePopState() {
    const currentPath = window.location.pathname;
    const matchingRoute = this.findMatchingRoute(currentPath, this.routes);

    if (matchingRoute) {
      if (matchingRoute.routeto) {
        this.navigate(matchingRoute.routeto);
        return;
      }

      const errorElement = document.createElement("div");
      matchingRoute.element(
        errorElement,
        this.filterAndSanitizeParams(matchingRoute.params)
      ); // Filter and sanitize params

      if (matchingRoute.children) {
        const nestedPath = currentPath.slice(matchingRoute.path.length);
        const childElement = errorElement.querySelector(
          "#child"
        ) as HTMLDivElement;
        if (childElement) {
          this.renderChildren(
            matchingRoute.children,
            nestedPath,
            childElement,
            this.filterAndSanitizeParams(matchingRoute.params!)
          ); // Filter and sanitize params
        }
      }
    } else {
      const notFoundRoute = this.findMatchingRoute("*", this.routes);
      if (notFoundRoute) {
        const errorElement = document.createElement("div");
        notFoundRoute.element(
          errorElement,
          this.filterAndSanitizeParams(notFoundRoute.params)
        ); // Filter and sanitize params
      }
    }
  }

  private renderChildren(
    children: RouteConfig[] | undefined,
    nestedPath: string,
    parentElement: HTMLElement,
    parentParams: Record<string, string>
  ) {
    if (!children || children.length === 0) {
      const childElement = parentElement.querySelector(
        "#child"
      ) as HTMLDivElement;
      if (childElement) {
        childElement.remove();
      }
      return;
    }

    const matchingChild = this.findMatchingRoute(nestedPath, children);
    if (matchingChild) {
      const childElement = document.createElement("div");
      childElement.id = "child";
      const mergedParams = { ...parentParams, ...matchingChild.params };
      matchingChild.element(
        childElement,
        this.filterAndSanitizeParams(mergedParams)
      ); // Filter and sanitize params
      parentElement.appendChild(childElement);

      if (matchingChild.children) {
        const nextNestedPath = nestedPath.slice(matchingChild.path.length);
        this.renderChildren(
          matchingChild.children,
          nextNestedPath,
          childElement,
          this.filterAndSanitizeParams(mergedParams)
        ); // Filter and sanitize params
      }
    }
  }

  private findMatchingRoute(
    path: string,
    routes: RouteConfig[]
  ): RouteConfig | undefined {
    for (const route of routes) {
      const routePath = route.path;
      const isDefaultRoute = routePath === "*";

      if (!isDefaultRoute) {
        const paramNames: string[] = [];
        const regexPattern = routePath.replace(/:[^\s/]+/g, match => {
          paramNames.push(match.substring(1));
          return "([^\\s/]+)";
        });

        const regex = new RegExp(`^${regexPattern}(?:/|$)`);
        const match = path.match(regex);

        if (match) {
          const params: Record<string, string> = {};
          paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
          });

          if (route.children) {
            const nestedPath = path.slice(match[0].length);
            const matchingChild = this.findMatchingRoute(
              nestedPath,
              route.children
            );
            if (matchingChild) {
              matchingChild.params = params;
              return matchingChild;
            }
          }

          return { ...route, params };
        }
      } else {
        return route;
      }
    }

    return undefined;
  }

  private filterAndSanitizeParams(
    params?: Record<string, string>
  ): Record<string, string> {
    if (!params) return {};
    const sanitizedParams: Record<string, string> = {};
    for (const key in params) {
      if (params.hasOwnProperty(key) && this.expectedParams!.has(key)) {
        sanitizedParams[key] = DOMPurify.sanitize(params[key]);
      }
    }
    return sanitizedParams;
  }

  navigate(path: string) {
    history.pushState(null, "", path);
    this.handlePopState();
  }

  addRoute(route: RouteConfig) {
    this.routes.push(route);
  }
}
