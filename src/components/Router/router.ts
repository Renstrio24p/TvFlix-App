import { TSRouter } from "../../utils/routes/class/Router.class";
import Home from "../../pages/Home/Home";
import NotFound from "../../pages/404/NotFound";
import { useTSPurifier } from "../../utils/hooks/useTSPurifier";
import Movies from "../../pages/Movies/Movies";
import Details from "../../pages/Details/Details";

export const Router = (DOM: HTMLElement, websiteName: string) => {
  console.log(websiteName);
  const routes = new TSRouter(
    [
      {
        path: "/",
        element: () => Home(DOM, websiteName),
      },
      {
        path: "/details",
        element: () => Details(DOM, websiteName),
      },
      {
        path: "/movielist",
        element: () => Movies(DOM, websiteName),
      },
      {
        path: "*",
        element: () => NotFound(DOM, websiteName),
      },
    ],
    [String(useTSPurifier(window.location.search))]
  );
  return routes.navigate("");
};
