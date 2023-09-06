import { Injectable, NestMiddleware } from "@nestjs/common";
import { isArray } from "class-validator";
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

declare global {
  namespace Express {
    interface Request {
      refreshUser?: UserEntity;
    }
  }
}

@Injectable()
export class RefreshUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
      req.refreshUser = null;
      next();
      return;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const decodedToken: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const id = decodedToken.id;
        const refreshUser = await this.usersService.findOne(+id);
        req.refreshUser = refreshUser;
        next();
      } catch (e) {
        req.refreshUser = null;
        next();
      }
    }
  }
}