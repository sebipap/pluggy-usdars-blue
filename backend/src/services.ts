import scrapeIt from "scrape-it";
import fs from "fs";

const latestReport: FullReport = JSON.parse(
  fs.readFileSync("public/latestReport.json", "utf8")
);

console.log(latestReport)

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

interface ScrapeResult {
  data: { buy: string; sell: string };
  body: string;
}

const getQuote = async (dataSource: DataSource) => {
  const { name, source, buy_key, sell_key, buy_selector, sell_selector } =
    dataSource;

  const { data, body }: ScrapeResult = await scrapeIt(source, {
    buy: buy_selector || "buy",
    sell: sell_selector || "sell",
  });

  const buy_price = data.buy || JSON.parse(body)[buy_key] || "null";
  const sell_price = data.sell || JSON.parse(body)[sell_key] || "null";

  const parsePriceToFloat = (priceStr: string) =>
    parseFloat(priceStr.replace("$", ""));

  return {
    name,
    buy_price: parsePriceToFloat(buy_price),
    sell_price: parsePriceToFloat(sell_price),
    source,
  };
};

const sources = [
  {
    name: "Ambito Financiero",
    source: "https://mercados.ambito.com/dolar/informal/variacion",
    buy_key: "compra",
    sell_key: "venta",
  },

  {
    name: "Dolar Hoy",
    source: "https://dolarhoy.com/",
    buy_selector: ".is-5 .compra div.val",
    sell_selector: ".is-5 .venta div.val",
  },
  {
    name: "El Cronista",
    source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB/",
    buy_selector: "div.buy-value",
    sell_selector: "div.sell-value",
  },
  {
    name: "Source without selector nor keys example",
    source: "https://mercados.ambito.com/dolar/informal/variacion",
  },
];

const quotes = async () =>
  await Promise.all(sources.map(async (source) => await getQuote(source)));

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
  console.log(latestReport)
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

  const fullQuotes: FullQuote[] = quotes.map(({ source, ...quote }: Quote) => ({
    ...quote,
    ...slippage.find(({ name }: Slippage) => quote.name == name),
    source,
  }));

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
