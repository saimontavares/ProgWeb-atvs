import { PrismaClient, Major } from '../generated/prisma'
import { CreateMajorDto } from '../types/major'

const prisma = new PrismaClient()

export const getAllMajors = async (): Promise<Major[]> => {
    return prisma.major.findMany();
}

export const createMajor = async (
    newMajor: CreateMajorDto
): Promise<Major> => {
    return await prisma.major.create({ data: newMajor });
}

export const getMajor = async (id: string): Promise<Major | null> => {
    return await prisma.major.findFirst({
        where: { id }
    });
}
