import { PrismaClient, Major } from '@prisma/client'
import { CreateMajorDto, UpdateMajorDto } from '../types/major'

const prisma = new PrismaClient()

export const getAllMajors = async (): Promise<Major[]> => {
    return prisma.major.findMany();
}

export const createMajor = async (
    newMajor: CreateMajorDto
): Promise<Major> => {
    return await prisma.major.create({ data: newMajor });
}

export const majorAlreadyExists = async (name: string): Promise<boolean> => {
    const existingMajor = await prisma.major.findFirst({
        where: { name }
    });
    return !!existingMajor;
}

export const getMajor = async (id: string): Promise<Major | null> => {
    return await prisma.major.findFirst({
        where: { id }
    });
}

export const updateMajor = async (
    id: string,
    updateMajor: UpdateMajorDto
): Promise<Major> => {
    return await prisma.major.update({
        where: { id },
        data: updateMajor
    });
}

export const removeMajor = async (
    id: string
): Promise<Major> => {
    return await prisma.major.delete({
        where: { id }
    });
}