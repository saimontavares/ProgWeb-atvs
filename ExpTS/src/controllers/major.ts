import { Request, Response } from 'express'
import { createMajor, getMajor, getAllMajors } from '../services/major'
import { CreateMajorDto } from '../types/major'

const index = async (req: Request, res: Response) => {
    const majors = await getAllMajors();
    res.render('major/index', { majors });
}
const create = async (req: Request, res: Response) => { 
    if(req.method === 'GET') {
        res.render('major/create');
    } else if (req.method === 'POST') {
        try {
            const newMajor = req.body as CreateMajorDto;
            const major = await createMajor(newMajor);
            res.redirect('/major');
        } catch (error) {
            console.error(error);
        }
    }
}
export const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const major = await getMajor(id); // Remova o parseInt
        res.render('major/read', { major });
    } catch (error) {
        console.error(error);
    }
} 
const update = (req: Request, res: Response) => { }
const remove = (req: Request, res: Response) => { }
export default { index, read, create, update, remove }