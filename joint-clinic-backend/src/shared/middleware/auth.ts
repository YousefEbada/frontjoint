import { NextFunction, Request, Response } from 'express';
// Stub: parse user from JWT or session. For now anonymous.
export function authOptional(req: Request, _res: Response, next: NextFunction) {
  (req as any).user = (req as any).user || undefined;
  next();
}
