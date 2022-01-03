/* eslint-disable max-classes-per-file */
import faker from 'faker';
import { UserRepository } from '@/data/repositories/user/user-repository';
import { IdGenerator } from '@/data/services/id/id-generator';
import { UserModel } from '@/domain/models';
import {
  RegisterUser,
  UserRegisterParams,
} from '@/domain/usecases/create-user';
import { RegisterUserOnLocalStorage } from './register-user-on-local-storage';

class UserRepositorySpy implements UserRepository {
  public addedUser: UserModel | undefined;

  public addedUserCount: number = 0;

  add(user: UserModel): Promise<void> {
    this.addedUser = user;
    this.addedUserCount += 1;
    return Promise.resolve();
  }

  remove(userId: string): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  findOne(userId: string): Promise<UserModel> {
    return Promise.resolve({} as UserModel);
  }

  findAll(): Promise<UserModel[]> {
    return Promise.resolve([]);
  }
}

class IdGeneratorSpy implements IdGenerator {
  public id = faker.datatype.uuid();

  public callsCount: number = 0;

  generateId(): string {
    this.callsCount += 1;
    return this.id;
  }
}

type SystemUnderTestTypes = {
  systemUnderTest: RegisterUser;
  userRepositorySpy: UserRepositorySpy;
  idGeneratorSpy: IdGeneratorSpy;
  fakeUserParams: UserRegisterParams;
};

const buildSystemUnderTest = (): SystemUnderTestTypes => {
  const userRepositorySpy = new UserRepositorySpy();
  const idGeneratorSpy = new IdGeneratorSpy();
  const systemUnderTest = new RegisterUserOnLocalStorage(
    userRepositorySpy,
    idGeneratorSpy,
  );

  const fakeUserParams: UserRegisterParams = {
    birthDate: faker.date.between('01/01/1990', '01/01/2020'),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };

  return { idGeneratorSpy, systemUnderTest, userRepositorySpy, fakeUserParams };
};

describe('RegisterUserOnLocalStorage', () => {
  test('Should call id generator only once', async () => {
    const { systemUnderTest, idGeneratorSpy, fakeUserParams } =
      buildSystemUnderTest();

    await systemUnderTest.register(fakeUserParams);

    expect(idGeneratorSpy.callsCount).toBe(1);
  });

  test('Should create the user using the correct generated id', async () => {
    const { systemUnderTest, idGeneratorSpy, fakeUserParams } =
      buildSystemUnderTest();

    const user = await systemUnderTest.register(fakeUserParams);

    expect(user.id).toBe(idGeneratorSpy.id);
  });

  test('Should create the user with the correct provided params', async () => {
    const { systemUnderTest, fakeUserParams } = buildSystemUnderTest();

    const user = await systemUnderTest.register(fakeUserParams);

    expect(user).toMatchObject(fakeUserParams);
  });

  test('Should call the repository add method with the correct params', async () => {
    const {
      systemUnderTest,
      fakeUserParams,
      userRepositorySpy,
      idGeneratorSpy,
    } = buildSystemUnderTest();

    await systemUnderTest.register(fakeUserParams);

    expect(userRepositorySpy.addedUser).toEqual({
      ...fakeUserParams,
      id: idGeneratorSpy.id,
    });
  });

  test('Should call the repository add method only once', async () => {
    const { systemUnderTest, fakeUserParams, userRepositorySpy } =
      buildSystemUnderTest();

    await systemUnderTest.register(fakeUserParams);

    expect(userRepositorySpy.addedUserCount).toEqual(1);
  });
});
