import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAverage } from "../services";

export default async (request: VercelRequest, response: VercelResponse) => {
  response.json(await getAverage());
};

