import cors from "cors";
import express, { Application} from "express";

import apiRoute from "./routes";
import { updateValues } from "./services";

const app: Application = express();
const PORT: any = process.env.PORT || 5000;

updateValues();
setInterval(updateValues, 10000);

app.use(cors({ origin: "*" }));
app.use("/api/latestReport", express.static("public/latestReport.json"));
app.use("/icons", express.static("public/icons"));
app.use("/api", apiRoute);
app.use(express.json());

app.listen(PORT, () => console.log(`✔️ Server started on port ${PORT} ✔️`));