/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { IdGenerator } from '@/data/services/id/id-generator';

class IdGeneratorSpy implements IdGenerator {
  public id = faker.datatype.uuid();

  public callsCount: number = 0;

  generateId(): string {
    this.callsCount += 1;
    return this.id;
  }
}

export { IdGeneratorSpy };
