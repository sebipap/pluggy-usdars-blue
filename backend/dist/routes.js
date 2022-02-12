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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cachedData_1 = require("./services/cachedData");
const cachedData_2 = require("./services/cachedData");
const cachedData_3 = require("./services/cachedData");
const router = (0, express_1.Router)();
router.get("/quotes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, cachedData_3.cachedQuotes)());
    }
    catch (e) {
        res.sendStatus(400).send({ e });
    }
}));
router.get("/average", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, cachedData_2.cachedAverage)());
    }
    catch (e) {
        res.sendStatus(400).send({ e });
    }
}));
router.get("/slippage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, cachedData_1.cachedSlippage)());
    }
    catch (e) {
        res.sendStatus(400).send({ e });
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map