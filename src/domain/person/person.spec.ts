import mockDate from 'mockdate';
import faker from 'faker';
import { Person } from './person';

type SystemUnderTestType = {
  person: Person;
  firstName: string;
  lastName: string;
  birthDate: Date;
  age: number;
};

const buildSystemUnderTest = (): SystemUnderTestType => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const birthDate = new Date('01/01/1950');
  mockDate.set('01/01/2000');
  const age = 50;

  const person = new Person(firstName, lastName, birthDate);

  return { firstName, lastName, birthDate, person, age };
};

describe('Person', () => {
  test('Should return the correct full name', () => {
    const { firstName, lastName, person } = buildSystemUnderTest();

    expect(person.getFullName()).toBe(`${firstName} ${lastName}`);
  });

  test('Should return the correct age', () => {
    const { person, age } = buildSystemUnderTest();

    expect(person.getAge()).toBe(age);
    mockDate.reset();
  });
});
