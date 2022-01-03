import { UserModel } from './user-model';

export type GuestModel = UserModel & {
  isPresenceConfirmed: boolean;
};
