"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sources = void 0;
const requestHandlers_1 = require("./requestHandlers");
exports.sources = [
    {
        name: "Ambito Financiero",
        source: "https://mercados.ambito.com/dolar/informal/variacion",
        buy_key: "compra",
        sell_key: "venta",
        requestHandler: requestHandlers_1.ambitoApiRequest,
    },
    {
        name: "Dolar Hoy",
        source: "https://dolarhoy.com/",
        buy_selector: ".is-5 .compra div.val",
        sell_selector: ".is-5 .venta div.val",
        requestHandler: requestHandlers_1.scrape,
    },
    {
        name: "El Cronista",
        source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB/",
        buy_selector: "div.buy-value",
        sell_selector: "div.sell-value",
        requestHandler: requestHandlers_1.scrape,
    },
    {
        name: "Invalid Source Example",
        source: "https://invalid.com",
        requestHandler: requestHandlers_1.scrape,
    },
];
//# sourceMappingURL=dataSources.js.map