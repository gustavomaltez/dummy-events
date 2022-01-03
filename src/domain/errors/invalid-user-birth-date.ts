class InvalidUserBirthDate extends Error {
  constructor() {
    super('Invalid User Birth Date');
    this.name = 'InvalidUserBirthDate';
  }
}

export { InvalidUserBirthDate };
