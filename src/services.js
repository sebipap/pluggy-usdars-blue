const scrapeIt = require("scrape-it");

const axios = require("axios").default;

const getQuotes = async () => {
  const ambitoData = await axios.get(
    "https://mercados.ambito.com/dolar/informal/variacion"
  );

  const ambitoParsedData = {
    buy_price: parseFloat(ambitoData.data.compra),
    sell_price: parseFloat(ambitoData.data.venta),
    source: "https://mercados.ambito.com/dolar/informal/variacion",
  };



  const dolarhoyData = await scrapeIt("https://dolarhoy.com/", {
    buy_price: ".is-5 .compra div.val",
		sell_price: ".is-5 .venta div.val",
  });


	const dolarHoyParsedData =  {
		buy_price: parseFloat(dolarhoyData.data.buy_price.replace("$","")),
    sell_price: parseFloat(dolarhoyData.data.sell_price.replace("$","")),
    source: "https://dolarhoy.com/",
	}


	const cronistaData = await scrapeIt("https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB", {
    buy_price: "div.buy-value",
		sell_price: "div.sell-value",
  });


	const cronistaParsedData =  {
		buy_price: parseFloat(cronistaData.data.buy_price.replace("$","")),
    sell_price: parseFloat(cronistaData.data.sell_price.replace("$","")),
    source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB",
	}


	const responses = await Promise.all([ambitoParsedData, dolarHoyParsedData,  cronistaParsedData])

	return responses


};
const getAverage = () => "Average";
const getSlippage = () => "Slippage";

module.exports = { getQuotes, getAverage, getSlippage };
