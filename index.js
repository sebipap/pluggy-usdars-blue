const express = require("express");
const cors = require('cors')({origin: true})
const PORT = process.env.PORT || 5000;
const app = express();


const apiRoute = require("./src/routes");
app.use("/api", apiRoute);

app.use(express.json());
app.listen(PORT, () => console.log(`[server in port ${PORT}] ✔️`));
