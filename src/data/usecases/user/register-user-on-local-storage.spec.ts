import {
  RegisterUser,
  UserRegisterParams,
} from '@/domain/usecases/create-user';
import { RegisterUserOnLocalStorage } from './register-user-on-local-storage';
import { UserRepositorySpy } from '@/data/tests/repositories/user/mock-user-repository';
import { IdGeneratorSpy } from '@/data/tests/services/id/mock-id-generator';
import { mockUserRegisterParams } from '@/domain/tests/usecases/mock-register-user-params';

type SystemUnderTestTypes = {
  systemUnderTest: RegisterUser;
  userRepositorySpy: UserRepositorySpy;
  idGeneratorSpy: IdGeneratorSpy;
  fakeUserParams: UserRegisterParams;
};

const buildSystemUnderTest = (): SystemUnderTestTypes => {
  const fakeUserParams = mockUserRegisterParams();
  const userRepositorySpy = new UserRepositorySpy();
  const idGeneratorSpy = new IdGeneratorSpy();
  const systemUnderTest = new RegisterUserOnLocalStorage(
    userRepositorySpy,
    idGeneratorSpy,
  );

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
