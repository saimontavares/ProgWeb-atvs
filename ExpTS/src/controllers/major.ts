import { Request, Response } from 'express'
const index = (req: Request, res: Response) => {

}
const create = (req: Request, res: Response) => { 
    if(req.method === 'GET') {
        res.render('major/create');
    } else if (req.method === 'POST') {
        try {
            const newMajor = req.body as CreateMajotDTO;
            const major = await createMajor(newMajor);
            res.readirect('/major');
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
const update = (req: Request, res: Response) => { }
const remove = (req: Request, res: Response) => { }
export default { index, read, create, update, remove }