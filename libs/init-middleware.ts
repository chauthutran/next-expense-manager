import type { NextApiRequest, NextApiResponse } from 'next';

// Generic function to wrap middleware as a promise
export default function initMiddleware(
  middleware: (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result?: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
}
