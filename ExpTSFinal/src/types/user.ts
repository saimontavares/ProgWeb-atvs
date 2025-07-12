import { User } from '@prisma/client';

export type CreateUserDto = Pick<User, 'name' | 'email' | 'password' | 'majorId'>;
export type UpdateUserDto = Partial<Pick<User, 'id' | 'name' | 'email' | 'password' | 'majorId'>>;
export type LoginDto = Pick<User, 'email' | 'password'>;
export type RemoveUserDto = Pick<User, 'id'>;