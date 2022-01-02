import { Person } from '../person/person';

class Guest extends Person {
  private confirmedPresence: boolean;

  constructor(firstName: string, lastName: string, birthDate: Date) {
    super(firstName, lastName, birthDate);

    this.confirmedPresence = false;
  }

  public confirmPresence() {
    this.confirmedPresence = true;
  }

  public disconfirmPresence() {
    this.confirmedPresence = false;
  }

  public isPresenceConfirmed() {
    return this.confirmedPresence;
  }
}

export { Guest };
