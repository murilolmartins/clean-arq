import {
  type OutputCreateUserDTO,
  type InputCreateUserDTO,
} from '../../application/dtos/create-user.dtos';
import { type UserRepository } from '../../application/repositories/user.repository';
import { type UserPrisma } from '../adapters/userPrisma.adapter';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly user: UserPrisma) {}
  async create(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    return await this.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        birthdate: new Date(),
        age: 0,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
