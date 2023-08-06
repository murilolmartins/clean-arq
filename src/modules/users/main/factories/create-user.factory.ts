import { CreateUserService } from '../../application/services/create-user.service';
import { UserPrisma } from '../../infra/adapters/userPrisma.adapter';
import { UserPrismaRepository } from '../../infra/repositories/userPrisma.repository';
import { CreateUserController } from '../../presentation/controllers/create-user.controller';

export const createUserFactory = (): CreateUserController => {
  const userPrisma = new UserPrisma(prisma);
  const userRepository = new UserPrismaRepository(userPrisma);
  const createUserUseCase = new CreateUserService(userRepository);
  return new CreateUserController(createUserUseCase);
};
