/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { UserRegisterParams } from '@/domain/usecases/create-user';

const mockUserRegisterParams = (): UserRegisterParams => ({
  birthDate: faker.date.between('01/01/1990', '01/01/2020'),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
});

export { mockUserRegisterParams };
