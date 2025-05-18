import { details } from "../../components/Details/DetailHome";
import { detailsList } from "../../components/Details/DetailList";
import { useTSComponent } from "../../utils/hooks/useTSComponent";
import { useTSElements } from "../../utils/hooks/useTSElements";
import { useTSMetaData } from "../../utils/hooks/useTSMetaData";
import { configDetails } from "./config/Details.config";

export default function Details(DOM: HTMLElement, websiteName: string) {
  const siteName = String(websiteName);

  useTSMetaData({
    name: "Movie Details",
    description: "Movie Details Page",
    author: "Waren Gador",
  });

  document.title = `${siteName} - Details`;

  const ui = useTSElements(
    DOM,
    /*html*/ `
        <article class="container p-4">
            <section 
                aria-label='movies list'
                class="p-16 h-fit"
                id='movie-details'
            ></section>
            <section
                aria-label='upcoming movies'
                id='details-list'
            ></section>
      </article>
        `,
    configDetails
  );

  useTSComponent("movie-details", DOM, details);
  useTSComponent("details-list", DOM, detailsList);

  return ui;
}
