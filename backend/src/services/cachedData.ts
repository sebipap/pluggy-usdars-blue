import { FullQuote, FullReport } from "../types";
import fs from "fs";
import { getFullReport, updateValues } from "./index";

const latestReport = async() => {
  let report: FullReport 
  try {
    report = JSON.parse(fs.readFileSync("public/latestReport.json", "utf8"))
  } catch (e) {
    console.log("No report found, reloading")
    report = await getFullReport()
    updateValues()
  }
  return report
};

export const cachedQuotes = async() => {
  const { fullQuotes, update } = await latestReport();
  return {
    quotes: fullQuotes.map(
      ({ buy_price_slippage, sell_price_slippage, ...quote }: FullQuote) =>
        quote
    ),
    update,
  };
};

export const cachedAverage = async() => {
  const { average, update } = await latestReport();
  return { average, update };
};

export const cachedSlippage = async() => {
  const { fullQuotes, update } = await latestReport();
  return {
    slippage: fullQuotes.map(
      ({
        buy_price_slippage,
        sell_price_slippage,
        source,
        name,
      }: FullQuote) => ({
        name,
        buy_price_slippage,
        sell_price_slippage,
        source,
      })
    ),
    update,
  };
};
