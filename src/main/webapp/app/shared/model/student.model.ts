export interface IStudent {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number | null;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public age?: number | null,
  ) {}
}
