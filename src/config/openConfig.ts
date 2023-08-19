import open from "open";
import * as fs from "fs";
import { getConfigArgs } from "../command/args";

const { _: apps } = getConfigArgs();

function openConfig(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    return;
  }

  if (apps.length > 0) {
    apps.map((app) => {
      if (typeof app === "string") {
        open(filePath, { app: { name: app } });
      }
    });
  } else {
    open(filePath);
  }
}

export default openConfig;
