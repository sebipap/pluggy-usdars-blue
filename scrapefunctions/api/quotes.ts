import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getQuotes } from "../services";


export default async(request: VercelRequest, response: VercelResponse) => {
  response.json(await getQuotes())
};



