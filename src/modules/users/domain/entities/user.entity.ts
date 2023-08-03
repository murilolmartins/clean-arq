import { BaseEntity } from '@/shared/contracts/baseEntity';
import { left, type Either, right } from '@/shared/contracts/either';

import { type InvalidEmailError } from '../errors/invalid-email.error';
import { Email } from './email.entity';

export interface ICreateUserProps {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  age: number;
}

export class UserEntity extends BaseEntity {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly birthdate: Date,
    public readonly age: number,
  ) {
    super();
  }

  static create(
    userData: ICreateUserProps,
  ): Either<InvalidEmailError, UserEntity> {
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(
      userData.email,
    );

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const { email } = emailOrError.value;

    const user = new UserEntity(
      userData.name,
      email,
      userData.password,
      userData.birthdate,
      userData.age,
    );

    return right(user);
  }
}
