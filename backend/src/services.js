const scrapeIt = require("scrape-it");
const fs = require("fs");
const latestReport = require("../public/latestReport.json");

const arrAverage = (arr) =>
  arr.reduce((last, current) => last + current) / arr.length;

const diffPercentage = (first, second) => ((first - second) / second) * 100;

const getQuote = async ({ name, source, ...options }) => {
  const { data, body } = await scrapeIt(source, options);
  buy_price = data.buy_selector || JSON.parse(body)[options.buy_key];
  sell_price = data.sell_selector || JSON.parse(body)[options.sell_key];

  parsePriceToFloat = (priceStr) => parseFloat(priceStr.replace("$", ""));

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
];

const quotes = async () =>
  await Promise.all(sources.map(async (source) => await getQuote(source)));

const cachedQuotes = () => {
  const { fullQuotes, update } = latestReport;
  return {
    quotes: fullQuotes.map(
      ({ buy_price_slippage, sell_price_slippage, ...quote }) => quote
    ),
    update
  };
};

const cachedAverage = () => {
  const { average, update } = latestReport;
  return { average, update };
};

const cachedSlippage = () => {
  const { fullQuotes, update } = latestReport;
  return {
    slippage: fullQuotes.map(
      ({ buy_price_slippage, sell_price_slippage, source, name}) => ({
        name,
        buy_price_slippage,
        sell_price_slippage,
        source,
      })),
    update
  }
}

const getAverage = (quotes) => {
  const buy_prices = quotes.map((quote) => quote.buy_price);
  const sell_prices = quotes.map((quote) => quote.sell_price);

  return {
    average_buy_price: arrAverage(buy_prices),
    average_sell_price: arrAverage(sell_prices),
  };
};

const average = async () => {
  const quotesArr = await quotes();
  return getAverage(quotesArr);
};

const getSlippage = (quotes) => {
  const { average_buy_price, average_sell_price } = getAverage(quotes);

  const quoteSlippage = ({ name, buy_price, sell_price, source }) => {
    return {
      name,
      buy_price_slippage: diffPercentage(buy_price, average_buy_price),
      sell_price_slippage: diffPercentage(sell_price, average_sell_price),
      source,
    };
  };

  return quotes.map(quoteSlippage);
};

const slippage = async () => {
  const quotesArr = await quotes();
  return getSlippage(quotesArr);
};

const getFullReport = (quotes) => {
  const average = getAverage(quotes);
  const slippage = getSlippage(quotes);

  const fullQuotes = quotes.map(({ source, ...quote }) => ({
    ...quote,
    ...slippage.find(({ name }) => quote.name == name),
    source,
  }));

  return {
    average,
    fullQuotes,
    update: new Date().toLocaleString("sp-AR"),
  };
};

const updateValues = async () => {
  const quotesArr = await quotes();
  updateCache(getFullReport(quotesArr));
};

const updateCache = (obj) => {
  let jsonContent = JSON.stringify(obj);

  fs.writeFile("public/latestReport.json", jsonContent, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("Report Cache Updated " + obj.update);
  });
};

module.exports = {
  quotes,
  average,
  slippage,
  updateValues,
  cachedQuotes,
  cachedAverage,
  cachedSlippage,
};
