import axios, { AxiosResponse } from "axios";
const scrapeIt = require("scrape-it")
import { PriceData } from "../types";
import { DataSource } from "../types";

interface ScrapeData {
  buy: string;
  sell: string;
}



const priceToFloat = (price: string) => parseFloat(price.replace("$", ""));

export const scrape = async (dataSource: DataSource) => {
  const { name, source, buy_selector, sell_selector } = dataSource;
  
  console.log(`⏳ attemping ${name}... `);

  const priceData = await scrapeIt(source, {
    buy: buy_selector,
    sell: sell_selector,
  })
    .then((res: any) => {
      const { buy, sell }: ScrapeData = res.data;

      const priceData: PriceData = {
        buy_price: priceToFloat(buy),
        sell_price: priceToFloat(sell),
      };

      console.log(
        `☑️ ${name}: success response  ${priceData.buy_price} ${priceData.sell_price} `
      );
      return priceData;
    })
    .catch((e: any) => {
      console.log(`❌ ${name}: scrape error \n ${e} `);
      return {
        buy_price: 0,
        sell_price: 0,
      };
    });

  return priceData;
};

export const ambitoApiRequest = async ({ name, source }: DataSource) => {
  console.log(`⏳ attemping ${name} `);
  const priceData = await axios(source)
    .then((res: AxiosResponse) => {
      const { compra, venta } = res.data;
      const priceData: PriceData = {
        buy_price: priceToFloat(compra),
        sell_price: priceToFloat(venta),
      };
      console.log(
        `☑️ ${name}: success response   ${priceData.buy_price} ${priceData.sell_price} `
      );

      return priceData;
    })
    .catch((e) => {
      console.log(`❌ ${name}: parse error \n ${e} `);
      return {
        buy_price: 0,
        sell_price: 0,
      };
    });

  return priceData ;
};
