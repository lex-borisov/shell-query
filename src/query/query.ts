import { validateArgs } from "../command/args/validate-args.js";
import { print } from "../helpers/print/severity.js";
import { getEngines } from "./get-engines.js";
import { openUrls } from "./open-urls.js";
import { getUrls } from "./get-urls.js";
import { printQuery } from "./print-query.js";

export async function query(): Promise<void> {
  const errors = validateArgs();
  if (errors.length > 0) {
    errors.forEach((message) => {
      print(message);
    });
    return;
  }

  const engines = getEngines();
  const urls: string[] = engines.map((engine) => getUrls(engine)).flat();
  const browserQueries = await openUrls(urls);

  printQuery(urls, browserQueries);
}
