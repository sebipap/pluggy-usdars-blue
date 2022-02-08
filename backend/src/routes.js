const { quotes, average, slippage } = require("./services");

const router = require("express").Router();

router.get("/quotes", async (req, res) => {
 try{
	res.send(await quotes())
 }catch(e){
	res.sendStatus(400).send({dfdd: e})
 } ;
});
router.get("/average", async(req, res) => {

	 res.send(await average())
	
 });
router.get("/slippage", async (req, res) => res.send(await slippage()));

module.exports = router;
