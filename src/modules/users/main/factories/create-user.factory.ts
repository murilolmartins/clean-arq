import { CreateUserService } from '../../application/services/create-user.service';
import { UserPrismaRepository } from '../../infra/repositories/userPrisma.repository';
import { CreateUserController } from '../../presentation/controllers/create-user.controller';

export const createUserFactory = (): CreateUserController => {
  const userRepository = new UserPrismaRepository();
  const createUserUseCase = new CreateUserService(userRepository);
  return new CreateUserController(createUserUseCase);
};
