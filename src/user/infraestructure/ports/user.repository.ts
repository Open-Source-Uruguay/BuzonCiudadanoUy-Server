import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, privateFields } from "src/user/domain/entities/user.entity";
import { omit } from 'lodash';

export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(user: any): Promise<any> {
    const userRegistry = new this.userModel(user);

    await userRegistry.save();

    return omit(userRegistry.toJSON(), privateFields);
  }
}