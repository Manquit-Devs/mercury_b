import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db, { Admin } from '../database';

export default class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await db<Admin>('admin')
        .where({
          username,
          password,
        })
        .select();

      if (user[0]) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
        return res.status(200).send({ token, username });
      }
      return res.status(401).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }

  async verifyToken(req: Request, res: Response) {
    return res.status(200).send({ username: req.body.jwtPayload.username });
  }
}
