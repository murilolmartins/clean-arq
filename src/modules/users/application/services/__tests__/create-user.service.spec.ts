import { UserMemoryRepository } from '@/modules/users/infra/repositories/userMemory.repository';

import { type UserRepository } from '../../repositories/user.repository';
import { CreateUserService } from '../create-user.service';

let createUserUseCase: CreateUserService;
let userRepository: UserRepository;

beforeEach(() => {
  userRepository = new UserMemoryRepository();
  createUserUseCase = new CreateUserService(userRepository);
});

describe('CreateUserServide', () => {
  it('should create a user', async () => {
    const user = await createUserUseCase.create({
      name: 'John Doe',
      email: 'murilo@mail.com',
      password: '',
      birthdate: new Date(),
      age: 0,
    });

    expect(user.isRight()).toBeTruthy();
  });
});
