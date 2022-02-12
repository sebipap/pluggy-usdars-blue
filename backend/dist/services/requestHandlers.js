"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ambitoApiRequest = exports.scrape = void 0;
const axios_1 = __importDefault(require("axios"));
const scrape_it_1 = __importDefault(require("scrape-it"));
const priceToFloat = (price) => parseFloat(price.replace("$", ""));
const scrape = (dataSource) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, source, buy_selector, sell_selector } = dataSource;
    console.log(`⏳ attemping ${name}... `);
    const priceData = yield (0, scrape_it_1.default)(source, {
        buy: buy_selector,
        sell: sell_selector,
    })
        .then((res) => {
        const { buy, sell } = res.data;
        const priceData = {
            buy_price: priceToFloat(buy),
            sell_price: priceToFloat(sell),
        };
        console.log(`☑️ ${name}: success response  ${priceData.buy_price} ${priceData.sell_price} `);
        return priceData;
    })
        .catch((e) => {
        console.log(`❌ ${name}: scrape error \n ${e} `);
        return false;
    });
    return priceData;
});
exports.scrape = scrape;
const ambitoApiRequest = ({ name, source }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⏳ attemping ${name} `);
    const priceData = yield (0, axios_1.default)(source)
        .then((res) => {
        const { compra, venta } = res.data;
        const priceData = {
            buy_price: priceToFloat(compra),
            sell_price: priceToFloat(venta),
        };
        console.log(`☑️ ${name}: success response   ${priceData.buy_price} ${priceData.sell_price} `);
        return priceData;
    })
        .catch((e) => {
        console.log(`❌ ${name}: parse error \n ${e} `);
        return false;
    });
    return priceData;
});
exports.ambitoApiRequest = ambitoApiRequest;
//# sourceMappingURL=requestHandlers.js.map