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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedSlippage = exports.cachedAverage = exports.cachedQuotes = void 0;
const fs_1 = __importDefault(require("fs"));
const index_1 = require("./index");
const latestReport = () => __awaiter(void 0, void 0, void 0, function* () {
    let report;
    try {
        report = JSON.parse(fs_1.default.readFileSync("public/latestReport.json", "utf8"));
    }
    catch (e) {
        console.log("No report found, reloading");
        report = yield (0, index_1.getFullReport)();
        (0, index_1.updateValues)();
    }
    return report;
});
const cachedQuotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const { fullQuotes, update } = yield latestReport();
    return {
        quotes: fullQuotes.map((_a) => {
            var { buy_price_slippage, sell_price_slippage } = _a, quote = __rest(_a, ["buy_price_slippage", "sell_price_slippage"]);
            return quote;
        }),
        update,
    };
});
exports.cachedQuotes = cachedQuotes;
const cachedAverage = () => __awaiter(void 0, void 0, void 0, function* () {
    const { average, update } = yield latestReport();
    return { average, update };
});
exports.cachedAverage = cachedAverage;
const cachedSlippage = () => __awaiter(void 0, void 0, void 0, function* () {
    const { fullQuotes, update } = yield latestReport();
    return {
        slippage: fullQuotes.map(({ buy_price_slippage, sell_price_slippage, source, name, }) => ({
            name,
            buy_price_slippage,
            sell_price_slippage,
            source,
        })),
        update,
    };
});
exports.cachedSlippage = cachedSlippage;
//# sourceMappingURL=cachedData.js.map