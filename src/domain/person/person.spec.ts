import faker from 'faker';
import { Person } from './person';

type SystemUnderTestType = {
  person: Person;
  firstName: string;
  lastName: string;
  birthDate: Date;
};

const buildSystemUnderTest = (): SystemUnderTestType => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const birthDate = faker.date.past(20);

  const person = new Person(firstName, lastName, birthDate);

  return { firstName, lastName, birthDate, person };
};

describe('Person', () => {
  test('Should return the correct full name', () => {
    const { firstName, lastName, person } = buildSystemUnderTest();

    expect(person.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});
