import scrapeIt, { ScrapeResult } from "scrape-it";
import fs from "fs";
import axios from "axios";

const latestReport: FullReport = JSON.parse(
  fs.readFileSync("public/latestReport.json", "utf8")
);

interface AmbitoResponse {
  data: {
    compra: string;
    venta: string;
  };
}

interface PriceData {
  buy_price: number;
  sell_price: number;
}

const priceToFloat = (price: string) => parseFloat(price.replace("$", ""));

const ambito = {
  name: "Ambito Financiero",
  source: "https://mercados.ambito.com/dolar/informal/variacion",
  buy_key: "compra",
  sell_key: "venta",
  getValues: async function() {
    const priceData = await axios(
      "https://mercados.ambito.com/dolar/informal/variacion"
    )
      .then(({ data }: AmbitoResponse) => ({
        buy_price: priceToFloat(data.compra),
        sell_price: priceToFloat(data.venta),
      }))
      .catch((err) => console.log(err));

    
    return priceData as PriceData;
  },
}

const sources = [ambito
  ,

  {
    name: "Dolar Hoy",
    source: "https://dolarhoy.com/",
    buy_selector: ".is-5 .compra div.val",
    sell_selector: ".is-5 .venta div.val",
    async getValues() {
      return { buy_price: 2, sell_price: 3 };
    },
  },
  {
    name: "El Cronista",
    source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB/",
    buy_selector: "div.buy-value",
    sell_selector: "div.sell-value",
    async getValues() {
      const priceData = await scrapeIt(
        "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB/",
        {
          buy: "div.buy-value",
          sell: "div.sell-value",
        }
      ).then((res: any) => {
        const data: ScrapeData = res.data;
        return {
          buy_price: priceToFloat(data.buy),
          sell_price: priceToFloat(data.sell),
        };
      }).catch(e => console.log(e));

      return priceData as PriceData;
    },
  },
  {
    name: "Source without selector nor keys example",
    source: "https://mercados.ambito.com/dolar/informal/variacion",
    getValues() {
      return { buy_price: 2, sell_price: 3 };
    },
  },
];

const arrSum = (arr: number[]) =>
  arr.reduce((last: number, current: number) => last + current);

const arrAverage = (arr: number[]) => {
  const numbersArray = arr.filter((val) => val);
  return arrSum(numbersArray) / numbersArray.length;
};
const percentageDiff = (first: number, second: number) =>
  ((first - second) / second) * 100;

interface DataSource {
  name: string;
  source: string;
  buy_key?: string;
  sell_key?: string;
  buy_selector?: string;
  sell_selector?: string;
}

interface ScrapeData {
  buy: string;
  sell: string;
}

const getQuote = async (dataSource: DataSource) => {
  return {
    buy_price: 2,
    sell_price: 3,
    name: "pepe",
    source: "pepe.com",
  };
};

const quotes = async () =>
  await Promise.all(
    sources.map(async ({ name, source, getValues }) => {
      const { buy_price, sell_price }: PriceData = await getValues();

      console.log(buy_price, sell_price);

      return {
        name,
        source,
        buy_price,
        sell_price,
      };
    })
  );

interface FullQuote {
  name: String;
  buy_price: number;
  sell_price: number;
  buy_price_slippage: number;
  sell_price_slippage: number;
  source: String;
}

export const cachedQuotes = () => {
  const { fullQuotes, update } = latestReport;
  console.log(latestReport);
  return {
    quotes: fullQuotes.map(
      ({ buy_price_slippage, sell_price_slippage, ...quote }: FullQuote) =>
        quote
    ),
    update,
  };
};

export const cachedAverage = () => {
  const { average, update } = latestReport;
  return { average, update };
};

export const cachedSlippage = () => {
  const { fullQuotes, update } = latestReport;
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
interface Quote {
  name: string;
  buy_price: number;
  sell_price: number;
  source: string;
}

interface Average {
  name: string;
  average_buy_price: number;
  average_sell_price: number;
  source: string;
}

interface AverageValues {
  average_buy_price: number;
  average_sell_price: number;
}

const getAverage = (quotes: Quote[]) => {
  const buy_prices: number[] = quotes.map((quote) => quote.buy_price);
  const sell_prices: number[] = quotes.map((quote) => quote.sell_price);

  return {
    average_buy_price: arrAverage(buy_prices),
    average_sell_price: arrAverage(sell_prices),
  };
};

export const average = async () => {
  const quotesArr = await quotes();
  return getAverage(quotesArr);
};

interface Slippage {
  name: string;
  buy_price_slippage: number;
  sell_price_slippage: number;
  source: string;
}

const getSlippage = (quotes: Quote[]) => {
  const { average_buy_price, average_sell_price }: AverageValues =
    getAverage(quotes);

  const quoteSlippage = ({ name, buy_price, sell_price, source }: Quote) => {
    return {
      name,
      buy_price_slippage: percentageDiff(buy_price, average_buy_price),
      sell_price_slippage: percentageDiff(sell_price, average_sell_price),
      source,
    };
  };

  return quotes.map(quoteSlippage);
};

export const slippage = async () => {
  const quotesArr = await quotes();
  return getSlippage(quotesArr);
};

const getFullReport = (quotes: Quote[]) => {
  const average: AverageValues = getAverage(quotes);
  const slippage: Slippage[] = getSlippage(quotes);

  const isValid = ({ buy_price, sell_price }: Quote) => buy_price && sell_price;
  const addDetails = ({ source, ...quote }: Quote) => ({
    ...quote,
    ...slippage.find(({ name }: Slippage) => quote.name == name),
    source,
  });

  const fullQuotes: FullQuote[] = quotes.filter(isValid).map(addDetails);

  return {
    average,
    fullQuotes,
    update: new Date().toLocaleString("sp-AR"),
  };
};

interface FullReport {
  average: AverageValues;
  fullQuotes: FullQuote[];
  update: string;
}

export const updateValues = async () => {
  const quotesArr: Quote[] = await quotes();
  updateCache(getFullReport(quotesArr));
};

const updateCache = (fullReport: FullReport) => {
  fs.writeFile(
    "public/latestReport.json",
    JSON.stringify(fullReport),
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("Report Cache Updated " + fullReport.update);
    }
  );
};
