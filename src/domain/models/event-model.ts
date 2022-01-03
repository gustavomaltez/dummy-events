import { GuestModel } from './guest-model';

export type EventModel = {
  organizerId: string;
  startAt: Date;
  endAt: Date;
  minimumAge: number;
  guests: GuestModel[];
};
