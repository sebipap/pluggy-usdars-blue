const scrapeIt = require("scrape-it");

const arrAverage = (arr) =>
  arr.reduce((last, current) => last + current) / arr.length;

const diffPercentage = (first, second) => ((first - second) / second) * 100;

const getQuote = async (source, options) => {
  const { data, body } = await scrapeIt(source, options);
  buy_price = data.buy_selector || JSON.parse(body)[options.buy_key];
  sell_price = data.sell_selector || JSON.parse(body)[options.sell_key];

  parsePriceToFloat = (priceStr) => parseFloat(priceStr.replace("$", ""));

  return {
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
];

const quotes = async () =>
  await Promise.all(
    sources.map(async ({ source, ...options }) => await getQuote(source, options))
  );

const average = async () => {
  const quotesArr = await quotes();
  const buy_prices = quotesArr.map((quote) => quote.buy_price);
  const sell_prices = quotesArr.map((quote) => quote.sell_price);

  return {
    average_buy_price: arrAverage(buy_prices),
    average_sell_price: arrAverage(sell_prices),
  };
};

const slippage = async () => {
  const quotesArr = await quotes();
  const { average_buy_price, average_sell_price } = await average();

  const quoteSlippage = ({ buy_price, sell_price, source }) => {
    return {
      buy_price_slippage: diffPercentage(buy_price, average_buy_price),
      sell_price_slippage: diffPercentage(sell_price, average_sell_price),
      source,
    };
  };

  return quotesArr.map(quoteSlippage);
};

module.exports = { quotes, average, slippage };
