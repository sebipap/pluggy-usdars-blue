import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getQuotes } from "../services";

export default async (request: VercelRequest, response: VercelResponse) => {
  getQuotes()
    .then((res) => response.json(res))
    .catch((e) => {
      response.status(404).send({ err: e });
    });
};
