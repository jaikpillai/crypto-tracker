import type { NextApiRequest, NextApiResponse } from "next";
import { corsCheck } from "../middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await corsCheck(req, res);

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}
