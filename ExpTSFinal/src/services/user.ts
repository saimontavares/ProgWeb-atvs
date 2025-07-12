import { GameSession, PrismaClient, User } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from '../types/user'
import { CreateGameSessionDto } from '../types/gameSession'
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

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findFirst({
        where: { email }
    });
}

export const updateUser = async (
    id: string,
    updateUser: UpdateUserDto
): Promise<User> => {
    // Se for alteração de senha, encripte antes de salvar
    let dataToUpdate = { ...updateUser };
    if (dataToUpdate.password) {
        const salt = await genSalt(parseInt(process.env.ROUNDS_BCRYPT || '10'));
        dataToUpdate.password = await hash(dataToUpdate.password, salt);
    }
    return await prisma.user.update({
        where: { id },
        data: dataToUpdate
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

export const gameSession = async (userID: string, score: number): Promise<GameSession> => {
    const gameSessionData: CreateGameSessionDto = { userId: userID, score };
    return await prisma.gameSession.create({ data: gameSessionData });
}

export const getRanking = async () => {
    // Busca o maior score de cada usuário e ordena descendentemente
    const ranking = await prisma.gameSession.groupBy({
        by: ['userId'],
        _max: { score: true },
        orderBy: { _max: { score: 'desc' } },
        take: 10,
    });

    // Busca os dados dos usuários
    const users = await prisma.user.findMany({
        where: { id: { in: ranking.map(r => r.userId) } }
    });

    // Junta usuário e score
    return ranking.map(r => ({
        user: users.find(u => u.id === r.userId),
        score: r._max.score
    }));
};
