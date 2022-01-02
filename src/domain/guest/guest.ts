import { Person } from '../person/person';

class Guest extends Person {
  private isPresenceConfirmed: boolean;

  constructor(firstName: string, lastName: string, birthDate: Date) {
    super(firstName, lastName, birthDate);

    this.isPresenceConfirmed = false;
  }

  public confirmPresence() {
    this.isPresenceConfirmed = true;
  }

  public disconfirmPresence() {
    this.isPresenceConfirmed = false;
  }

  public getIsPresenceConfirmed() {
    return this.isPresenceConfirmed;
  }
}

export { Guest };
