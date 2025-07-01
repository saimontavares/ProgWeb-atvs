import {User} from '@prisma/client';

export type CreateUserDto =
    Pick<User, 'fullName' | 'email' | 'majorId'>;
export type UpdateUserDto =
    Pick<User, 'fullName' | 'email' | 'majorId'>;
export type RemoveUserDto =
    Pick<User, 'id'>;