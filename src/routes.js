const { getQuotes, getAverage, getSlippage } = require("./services");

const router = require("express").Router();

router.get("/quotes",  async(req, res) => res.send( await getQuotes()));
router.get("/average", (req, res) => res.send(getAverage()));
router.get("/slippage", (req, res) => res.send(getSlippage()));

module.exports = router;
