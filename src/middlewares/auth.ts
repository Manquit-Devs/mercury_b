import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) {
        return res.status(403).send();
      }
      req.body.jwtPayload = payload;
      next();
    });
  } else {
    res.status(401).send();
  }
};

export default authenticateUser;