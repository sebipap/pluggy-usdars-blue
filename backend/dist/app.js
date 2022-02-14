"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const updateValues_1 = require("./services/updateValues");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, updateValues_1.updateValues)();
setInterval(updateValues_1.updateValues, 60000);
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api/latestReport", express_1.default.static("public/latestReport.json"));
app.use("/icons", express_1.default.static("public/icons"));
app.use("/api", routes_1.default);
app.use(express_1.default.json());
app.listen(PORT, () => console.log(`✔️ Server started on port ${PORT} ✔️`));
//# sourceMappingURL=app.js.map