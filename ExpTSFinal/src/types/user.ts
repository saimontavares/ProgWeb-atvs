import { User } from '@prisma/client';

export type CreateUserDto = Pick<User, 'name' | 'email' | 'majorId' | 'password'>;
export type UpdateUserDto = Pick<User, 'name' | 'email' | 'majorId'>;
export type RemoveUserDto = Pick<User, 'id'>;
