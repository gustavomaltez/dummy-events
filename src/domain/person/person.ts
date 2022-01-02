class Person {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly birthDate: Date,
  ) {}

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export { Person };
