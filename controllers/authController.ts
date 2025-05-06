import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response) => {
  res.json({ user: req.user });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(err => {
    if (err) return next(err);
    res.sendStatus(200);
  });
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.json({ user: req.user || null });
};
