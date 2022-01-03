import { UserModel } from '@/domain/models';
import { UserRepository } from '../user-repository';

class UserRepositorySpy implements UserRepository {
  public addedUser: UserModel | undefined;

  public addedUserCount: number = 0;

  add(user: UserModel): Promise<void> {
    this.addedUser = user;
    this.addedUserCount += 1;
    return Promise.resolve();
  }

  remove(): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  findOne(): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  findAll(): Promise<UserModel[]> {
    return Promise.resolve([]);
  }
}

export { UserRepositorySpy };
