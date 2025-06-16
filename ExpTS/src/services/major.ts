import { PrismaClient, Major } from '@prisma/client'
import { CreateMajorDto } from '../types/major'

const prisma = new PrismaClient()

export const getAllMajors = async (): Promise<Major[]> => {
    return prisma.major.findMany();
}

export const getMajor = async (id: number): Promise<Major | null> => {
    return await prisma.major.findFirst({
        where: { id }
    });
}

export const createMajor = async (
    newMajor: CreateMajorDto
): Promise<Major> => {
    return await prisma.major.create({ data: newMajor })
}

