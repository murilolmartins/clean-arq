import { type ICreateUserProps } from '@/modules/users/domain/entities/user.entity';
import { type IUserData } from '@/modules/users/domain/interfaces/user-data';

export type InputCreateUserDTO = ICreateUserProps;

export type OutputCreateUserDTO = IUserData;
