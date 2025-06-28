import { Request, Response } from 'express'
import { createMajor, getMajor, getAllMajors, updateMajor, removeMajor} from '../services/major'
import { CreateMajorDto, UpdateMajorDto, RemoveMajorDto } from '../types/major'
import { majorSchema } from '../validators/majorValidator'

export const index = async (req: Request, res: Response) => {
    const majors = await getAllMajors();
    res.render('major/index', { majors });
}

export const create = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render('major/create');
    } else if (req.method === 'POST') {
        try {
            const newMajor = req.body as CreateMajorDto;
            const { error } = majorSchema.validate(newMajor);
            if (error) {
                return res.status(400).render('major/create', { error: error.details[0].message, values: newMajor });
            }
            await createMajor(newMajor);
            res.redirect('/major');
        } catch (error) {
            console.error(error);
        }
    }
}

export const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const major = await getMajor(id);
        res.render('major/read', { major });
    } catch (error) {
        console.error(error);
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.method === 'GET') {
        try {
            const major = await getMajor(id);
            res.render('major/update', { major });
        } catch (error) {
            console.error(error);
        }
    } else if (req.method === 'POST') {
        try {
            const updatedMajor = req.body as UpdateMajorDto;
            const { error } = majorSchema.validate(updatedMajor);
            if (error) {
                return res.status(400).render('major/update', { error: error.details[0].message, major: { ...updatedMajor, id } });
            }
            await updateMajor(id, updatedMajor);
            res.redirect('/major');
        } catch (error) {
            console.error(error);
        }
    }
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.method === 'GET') {
        try {
            const major = await getMajor(id);
            res.render('major/remove', { major });
        } catch (error) {
            console.error(error);
        }
    } else if (req.method === 'POST') {
        try {
            const removedMajor = req.body as RemoveMajorDto;
            const { error } = majorSchema.validate(removedMajor);
            if (error) {
                return res.status(400).render('major/remove', { error: error.details[0].message, major: removedMajor });
            }
            await removeMajor(removedMajor.id);
            res.redirect('/major');
        } catch (error) {
            console.error(error);
        }
    }
}

export default {
    index,
    create,
    read,
    update,
    remove
}