import { NextApiRequest, NextApiResponse } from "next";

import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  origin: ["https://www.example.com"],
  methods: ["POST", "GET", "HEAD"],
});

export const corsCheck = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function = cors
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
