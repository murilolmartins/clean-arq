import { type PrismaAdapter } from '@/main/adapters/prisma.adapter';
import { type PrismaClient, type Prisma as P } from '@prisma/client';

export class UserPrisma implements PrismaAdapter {
  constructor(private readonly prisma: PrismaClient) {}
  async create({
    data,
    select,
  }: {
    data: P.UserCreateInput;
    select?: P.UserSelect;
  }): Promise<any> {
    return await this.prisma.user.create({ data, select });
  }
}
