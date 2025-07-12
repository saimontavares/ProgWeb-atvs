import { PrismaClient, User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from '../types/user'
import { compare, genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient()

export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
}

export const createUser = async (
    data: CreateUserDto
): Promise<User> => {
    const salt = await genSalt(parseInt(process.env.ROUNDS_BCRYPT || '10'));
    const password = await hash(data.password, salt);
    // Remova repeatPassword do objeto enviado ao Prisma
    const { repeatPassword, ...userData } = data as any;
    return await prisma.user.create({ data: { ...userData, password } });
}

export const userAlreadyExists = async (email: string): Promise<boolean> => {
    const existingUser = await prisma.user.findFirst({
        where: { email }
    });
    return !!existingUser;
}

export const getUser = async (id: string): Promise<User | null> => {
    return await prisma.user.findFirst({
        where: { id }
    });
}

export const updateUser = async (
    id: string,
    updateUser: UpdateUserDto
): Promise<User> => {
    return await prisma.user.update({
        where: { id },
        data: updateUser
    });
}

export const removeUser = async (
    id: string
): Promise<User> => {
    return await prisma.user.delete({
        where: { id }
    });
}

export const checkCredentials = async (email: string, password: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
        where: { email }
    });
    if (user) {
        return await compare(password, user.password);
    }
    return false;
}