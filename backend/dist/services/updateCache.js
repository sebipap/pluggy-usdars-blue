"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCache = void 0;
const fs_1 = __importDefault(require("fs"));
const updateCache = (fullReport) => {
    fs_1.default.writeFile("public/latestReport.json", JSON.stringify(fullReport), "utf8", (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("📝 report cache updated " + fullReport.update);
    });
};
exports.updateCache = updateCache;
//# sourceMappingURL=updateCache.js.map