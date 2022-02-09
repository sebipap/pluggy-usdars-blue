const { quotes, average, slippage, cachedQuotes, cachedSlippage, cachedAverage } = require("./services");

const router = require("express").Router();

router.get("/quotes",  (req, res) => {
  try {
    res.send(cachedQuotes());
  } catch (e) {
    res.sendStatus(400).send({ dfdd: e });
  }
});
router.get("/average",  (req, res) => {
  res.send(cachedAverage());
});
router.get("/slippage",  (req, res) => res.send(cachedSlippage()));




module.exports = router;
