import { moviesList } from "../../components/Movies/MoviesList";
import { useTSComponent } from "../../utils/hooks/useTSComponent";
import { useTSElements } from "../../utils/hooks/useTSElements";
import { useTSMetaData } from "../../utils/hooks/useTSMetaData";
import { configMovies } from "./config/Movies.config";

export default function Movies(DOM: HTMLElement, websiteName: string) {
  const siteName = String(websiteName);

  useTSMetaData({
    name: "Movies List",
    description: "List of Movies",
    author: "Waren Gador",
  });

  document.title = `${siteName} - Details`;

  const ui = useTSElements(
    DOM,
    /*html*/ `
        <article class="container">
            <section
                aria-label='upcoming movies'
                id='movies-list'
            ></section>
      </article>
        `,
    configMovies
  );

  useTSComponent("movies-list", DOM, moviesList);

  return ui;
}
