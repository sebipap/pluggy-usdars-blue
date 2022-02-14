import { sources } from "./dataSources";
import { arrAverage, percentageDiff } from "./scripts/math";
import { AverageValues, DataSource, FullQuote, PriceDataResponse, Quote, Slippage } from "../types";


export const getQuotes = async () =>
  await Promise.all(
    sources.map(async (source: DataSource) => {
      const priceData: PriceDataResponse = await source.requestHandler(source);

      if (priceData) {
        return {
          name: source.name,
          source: source.source,
          buy_price: priceData.buy_price,
          sell_price: priceData.sell_price,
        };
      } else {
        return {
          name: source.name,
          source: source.source,
          buy_price: null,
          sell_price: null,
        };
      }
    })
  );

export const getAverage = async () => {
  const quotes = await getQuotes();
  return averageOf(quotes);
};

const averageOf = (quotes: Quote[]) => {
  const buy_prices: number[] = quotes.map((quote) => quote.buy_price);
  const sell_prices: number[] = quotes.map((quote) => quote.sell_price);

  return {
    average_buy_price: arrAverage(buy_prices),
    average_sell_price: arrAverage(sell_prices),
  };
};

export const getSlippage = async () => {
  const quotes = await getQuotes();
  return slippageOf(quotes);
};

const slippageOf = (quotes: Quote[]) => {
  const { average_buy_price, average_sell_price }: AverageValues =
    averageOf(quotes);

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

export const getFullReport = async () => {
  const quotesArr: Quote[] = await getQuotes();
  return(fullReportOf(quotesArr));
};


const fullReportOf = (quotes: Quote[]) => {
  const average: AverageValues = averageOf(quotes);
  const slippage: Slippage[] = slippageOf(quotes);

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

