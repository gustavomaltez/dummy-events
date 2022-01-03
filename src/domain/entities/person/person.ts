class Person {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly birthDate: Date,
  ) {}

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getAge(): number {
    const ageDifferenceInMilliseconds = Date.now() - this.birthDate.getTime();
    const ageDate = new Date(ageDifferenceInMilliseconds);
    const ageInYears = Math.abs(ageDate.getUTCFullYear() - 1970);

    return ageInYears;
  }
}

export { Person };
