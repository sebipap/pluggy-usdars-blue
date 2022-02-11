import { Request, Response, Router } from "express";
import { cachedSlippage } from "./services/cachedData";
import { cachedAverage } from "./services/cachedData";
import { cachedQuotes } from "./services/cachedData";

const router = Router();

router.get("/quotes", async(req: Request, res: Response) => {
  try {
    res.send(await cachedQuotes());
  } catch (e) {
    res.sendStatus(400).send({ e });
  }
});

router.get("/average", async(req: Request, res: Response) => {
  try {
    res.send(await cachedAverage());
  } catch (e) {
    res.sendStatus(400).send({ e });
  }
});

router.get("/slippage", async(req: Request, res: Response) => {
  try {
    res.send(await cachedSlippage());
  } catch (e) {
    res.sendStatus(400).send({ e });
  }
});

export default router;
