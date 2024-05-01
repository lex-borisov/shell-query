import { configFlags } from "../../data/config-flags.js";
import { queryOptions, yargsOptions } from "../options.js";
import { queryArgs as args } from "./query-args.js";

/**
 * Returns a list of args that do not match CLI and yargs' options,
 * or the custom flags derived from the config's engine, browser,
 * and profile values. Does not check against config options.
 */
export function getInvalidArgs(): string[] {
  return Object.keys(args)
    .filter((key) => !yargsOptions.includes(key))
    .filter((key) => ![...queryOptions, ...configFlags].includes(key));
}