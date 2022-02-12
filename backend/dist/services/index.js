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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullReport = exports.updateValues = exports.getSlippage = exports.getAverage = void 0;
const dataSources_1 = require("./dataSources");
const updateCache_1 = require("./updateCache");
const math_1 = require("../scripts/math");
const math_2 = require("../scripts/math");
const getQuotes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(dataSources_1.sources.map((source) => __awaiter(void 0, void 0, void 0, function* () {
        const priceData = yield source.requestHandler(source);
        if (priceData) {
            return {
                name: source.name,
                source: source.source,
                buy_price: priceData.buy_price,
                sell_price: priceData.sell_price,
            };
        }
        else {
            return {
                name: source.name,
                source: source.source,
                buy_price: null,
                sell_price: null,
            };
        }
    })));
});
const getAverage = () => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield getQuotes();
    return averageOf(quotes);
});
exports.getAverage = getAverage;
const averageOf = (quotes) => {
    const buy_prices = quotes.map((quote) => quote.buy_price);
    const sell_prices = quotes.map((quote) => quote.sell_price);
    return {
        average_buy_price: (0, math_1.arrAverage)(buy_prices),
        average_sell_price: (0, math_1.arrAverage)(sell_prices),
    };
};
const getSlippage = () => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield getQuotes();
    return slippageOf(quotes);
});
exports.getSlippage = getSlippage;
const slippageOf = (quotes) => {
    const { average_buy_price, average_sell_price } = averageOf(quotes);
    const quoteSlippage = ({ name, buy_price, sell_price, source }) => {
        return {
            name,
            buy_price_slippage: (0, math_2.percentageDiff)(buy_price, average_buy_price),
            sell_price_slippage: (0, math_2.percentageDiff)(sell_price, average_sell_price),
            source,
        };
    };
    return quotes.map(quoteSlippage);
};
const fullReportOf = (quotes) => {
    const average = averageOf(quotes);
    const slippage = slippageOf(quotes);
    const isValid = ({ buy_price, sell_price }) => buy_price && sell_price;
    const addDetails = (_a) => {
        var { source } = _a, quote = __rest(_a, ["source"]);
        return (Object.assign(Object.assign(Object.assign({}, quote), slippage.find(({ name }) => quote.name == name)), { source }));
    };
    const fullQuotes = quotes.filter(isValid).map(addDetails);
    return {
        average,
        fullQuotes,
        update: new Date().toLocaleString("sp-AR"),
    };
};
const updateValues = () => __awaiter(void 0, void 0, void 0, function* () {
    const quotesArr = yield getQuotes();
    (0, updateCache_1.updateCache)(fullReportOf(quotesArr));
});
exports.updateValues = updateValues;
const getFullReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const quotesArr = yield getQuotes();
    return fullReportOf(quotesArr);
});
exports.getFullReport = getFullReport;
//# sourceMappingURL=index.js.map