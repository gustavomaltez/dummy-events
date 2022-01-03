import { UserModel } from '../models';

export type UserRegisterParams = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export interface RegisterUser {
  register: (params: UserRegisterParams) => Promise<UserModel>;
}
