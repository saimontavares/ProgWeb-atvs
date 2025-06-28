import { PrismaClient, User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from '../types/user'

const prisma = new PrismaClient()

export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
}

export const createUser = async (
    newUser: CreateUserDto
): Promise<User> => {
    return await prisma.user.create({ data: newUser });
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