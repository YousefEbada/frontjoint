import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// Stub: parse user from JWT or session. For now anonymous.
export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("\n\n\n\n %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Token:", token, "\n\n\n\n %%%%%%%%%%%%%%%%%%%%%");
  if (token) {
    const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
    try {
      const payload = jwt.verify(token, jwtSecret) as { userId: string, userType: string };
      console.log("auth middleware payload:", payload);
      (req as any).user = { id: payload.userId, userType: payload.userType }; 
    } catch (err) {
      console.error("authOptional middleware JWT verification error:", (err as Error).message);
      return res.status(401).json("Unauthorized: Invalid token");
    }
  } else {
    // (req as any).user = undefined;
     return res.status(401).json("Invalid token");
  }
  // (req as any).user = (req as any).user || undefined;
  next();
}
