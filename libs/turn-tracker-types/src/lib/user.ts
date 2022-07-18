export class UserDto {
  id?: string;
  name?: string;

  toString() {
    return `[${this.name && this.name + ', '}${this.id}]`;
  }
}

export class User extends UserDto {
  constructor(public override readonly id: string) {
    super();
  }
}
