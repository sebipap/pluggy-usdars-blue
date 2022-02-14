import { VercelRequest, VercelResponse } from "@vercel/node";
import {getFullReport } from "../services";

export default async (request: VercelRequest, response: VercelResponse) => {
  response.json(await getFullReport());
};

