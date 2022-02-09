const express = require("express");
const cors = require('cors')// ({origin: true})
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({origin: "*"}))
const apiRoute = require("./src/routes");
const { updateValues } = require("./src/services");

setInterval( updateValues, 60000);

app.use('/api/latestReport',express.static('public/latestReport.json'))
app.use("/api", apiRoute);

app.use(express.json());

app.listen(PORT, () => console.log(`[server in port ${PORT}] ✔️`));
