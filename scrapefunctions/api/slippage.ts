import { VercelRequest, VercelResponse } from "@vercel/node";
import {getSlippage } from "../services";

export default async (request: VercelRequest, response: VercelResponse) => {
  response.json(await getSlippage());
};

