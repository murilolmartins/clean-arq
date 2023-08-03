import { left, right } from '@/shared/contracts/either';

import {
  UserEntity,
  type ICreateUserProps,
} from '../../domain/entities/user.entity';
import {
  type CreateUserResponse,
  type CreateUserUseCase,
} from '../../domain/usecases/create-user.usecase';
import { type UserRepository } from '../repositories/user.repository';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly UserRepository: UserRepository) {}

  async create(data: ICreateUserProps): CreateUserResponse {
    const userOrError = UserEntity.create(data);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const newUser = await this.UserRepository.create(user);

    return right(newUser);
  }
}
