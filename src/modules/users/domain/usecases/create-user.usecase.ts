import { type Either } from '@/shared/contracts/either';

import { type ICreateUserProps } from '../entities/user.entity';
import { type InvalidEmailError } from '../errors/invalid-email.error';
import { type IUserData } from '../interfaces/user-data';

export type CreateUserResponse = Promise<Either<InvalidEmailError, IUserData>>;

export interface CreateUserUseCase {
  create: (data: ICreateUserProps) => CreateUserResponse;
}
