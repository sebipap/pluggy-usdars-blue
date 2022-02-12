import { DataSource } from "../types";
import { ambitoApiRequest, scrape } from "./requestHandlers";

export const sources: DataSource[] = [
  {
    name: "Ambito Financiero",
    source: "https://mercados.ambito.com/dolar/informal/variacion",
    buy_key: "compra",
    sell_key: "venta",
    requestHandler: ambitoApiRequest,
  },
  {
    name: "Dolar Hoy",
    source: "https://dolarhoy.com/",
    buy_selector: ".is-5 .compra div.val",
    sell_selector: ".is-5 .venta div.val",
    requestHandler: scrape,
  },
  {
    name: "El Cronista",
    source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB/",
    buy_selector: "div.buy-value",
    sell_selector: "div.sell-value",
    requestHandler: scrape,
  },

  {
    name: "Invalid Source Example",
    source: "https://invalid.com",
    requestHandler: scrape,
  },
];
