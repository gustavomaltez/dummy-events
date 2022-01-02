import faker from 'faker';
import { Guest } from './guest';

type SystemUnderTestType = {
  guest: Guest;
};

const buildSystemUnderTest = (): SystemUnderTestType => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const birthDate = faker.date.between('01/01/1970', '01/01/2022');

  const guest = new Guest(firstName, lastName, birthDate);

  return { guest };
};

describe('Guest', () => {
  test('Should be not confirmed presence by default', () => {
    const { guest } = buildSystemUnderTest();

    expect(guest.isPresenceConfirmed()).toBe(false);
  });

  test('Should be able to confirm presence', () => {
    const { guest } = buildSystemUnderTest();

    guest.confirmPresence();
    expect(guest.isPresenceConfirmed()).toBe(true);
  });

  test('Should be able to disconfirm presence', () => {
    const { guest } = buildSystemUnderTest();

    guest.disconfirmPresence();
    expect(guest.isPresenceConfirmed()).toBe(false);
  });
});
