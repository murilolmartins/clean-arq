import prisma from '@/main/prisma/client';

import {
  type OutputCreateUserDTO,
  type InputCreateUserDTO,
} from '../../application/dtos/create-user.dtos';
import { type UserRepository } from '../../application/repositories/user.repository';

export class UserPrismaRepository implements UserRepository {
  async create(data: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    return await prisma.user.create({
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
