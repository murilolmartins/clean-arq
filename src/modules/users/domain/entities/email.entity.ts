import { type Either, left, right } from '@/shared/contracts/either';

import { InvalidEmailError } from '../errors/invalid-email.error';

export class Email {
  constructor(public readonly email: string) {}

  static create(email: string): Either<InvalidEmailError, Email> {
    const emailOrError = Email.validate(email);

    if (!emailOrError) {
      return left(new InvalidEmailError(email, 400));
    }

    return right(new Email(email));
  }

  static validate(email: string): boolean {
    return email.includes('@');
  }
}
