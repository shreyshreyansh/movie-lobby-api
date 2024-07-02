import { Request, Response, NextFunction } from 'express';

// Mock admin authentication middleware
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = true; // Replace with real authentication logic
  if (isAdmin) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
};
