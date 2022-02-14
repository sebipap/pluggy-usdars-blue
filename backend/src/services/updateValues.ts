import fs from "fs";
import axios from "axios";
import { FullReport } from "../types";

export const updateValues = async () => {
  await axios("https://vercel-sl-sebipap.vercel.app/fullReport")
    .then((res: any) => updateCache(res.data))
    .catch((err: any) => console.log(err));
};


export const updateCache = (fullReport: FullReport) => {
  fs.writeFile(
    "public/latestReport.json",
    JSON.stringify(fullReport),
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("📝 report cache updated " + fullReport.update);
    }
  );
};
