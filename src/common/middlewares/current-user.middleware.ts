import { Injectable, NestMiddleware } from "@nestjs/common";
import { isArray } from "class-validator";
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
      req.currentUser = null;
      next();
      return;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const currentUser = await this.usersService.findOne(+id);
        req.currentUser = currentUser;
        next();
      } catch (e) {
        req.currentUser = null;
        next();
      }
    }
  }
}