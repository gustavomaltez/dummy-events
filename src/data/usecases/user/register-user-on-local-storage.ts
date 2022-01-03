import { UserRepository } from '@/data/repositories/user/user-repository';
import { IdGenerator } from '@/data/services/id/id-generator';
import { InvalidUserBirthDate } from '@/domain/errors';
import { UserModel } from '@/domain/models';
import {
  RegisterUser,
  UserRegisterParams,
} from '@/domain/usecases/create-user';

class RegisterUserOnLocalStorage implements RegisterUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  public async register(params: UserRegisterParams): Promise<UserModel> {
    if (params.birthDate.getTime() >= Date.now())
      throw new InvalidUserBirthDate();

    const id = this.idGenerator.generateId();
    const newUser: UserModel = {
      ...params,
      id,
    };
    await this.repository.add(newUser);

    return Promise.resolve(newUser);
  }
}

export { RegisterUserOnLocalStorage };
