import { randomUUID } from 'crypto';

import {
  type OutputCreateUserDTO,
  type InputCreateUserDTO,
} from '../../application/dtos/create-user.dtos';
import { type UserRepository } from '../../application/repositories/user.repository';
import { type UserEntity } from '../../domain/entities/user.entity';

export class UserMemoryRepository implements UserRepository {
  users: UserEntity[];

  constructor() {
    this.users = [];
  }

  async create(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      birthdate: data.birthdate,
      age: data.age,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
