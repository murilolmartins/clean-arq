import {
  type OutputCreateUserDTO,
  type InputCreateUserDTO,
} from '../dtos/create-user.dtos';

export interface UserRepository {
  create: (data: InputCreateUserDTO) => Promise<OutputCreateUserDTO>;
}
