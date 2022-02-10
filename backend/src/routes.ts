
import { Request, Response, Router} from "express";
import { cachedQuotes, cachedSlippage, cachedAverage }from "./services"

const router = Router();



router.get("/quotes",  (req: Request, res: Response) => {
  try {
    res.send(cachedQuotes());
  } catch (e) {
    res.sendStatus(400).send({ dfdd: e });
  }
});
router.get("/average",  (req: Request, res: Response) => {
  res.send(cachedAverage());
});
router.get("/slippage",  (req: Request, res: Response) => res.send(cachedSlippage()));




export default router