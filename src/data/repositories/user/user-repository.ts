import { UserModel } from '@/domain/models';

export interface UserRepository {
  add: (user: UserModel) => Promise<void>;
  remove: (userId: string) => Promise<UserModel>;
  findOne: (userId: string) => Promise<UserModel>;
  findAll: () => Promise<UserModel[]>;
}
