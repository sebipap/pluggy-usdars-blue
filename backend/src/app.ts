import cors from "cors"
import express, { Application, Request, Response } from "express"

const app: Application = express()


const PORT: any = process.env.PORT || 5000;

app.use(cors({origin: "*"}))

import apiRoute from "./routes" 

import { updateValues }from "./services"

updateValues()
setInterval( updateValues, 60000);

app.use('/api/latestReport',express.static('public/latestReport.json'))
app.use("/api", apiRoute);

app.use(express.json());

app.listen(PORT, () => console.log(`[server in port ${PORT}] ✔️`));
