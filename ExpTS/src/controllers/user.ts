import { Request, Response } from 'express'
import { getAllUsers, getUser, createUser, updateUser, removeUser } from '../services/user'
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from '../types/user'
import { userSchema } from '../validators/userValidator'

export const index = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.render('user/index', { users });
}

export const create = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render('user/create');
    } else if (req.method === 'POST') {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).render('user/create', { error: error.details[0].message, user: req.body });
        }
        try {
            await createUser(value);
            res.redirect('/user');
        } catch (error) {
            console.error(error);
            res.status(500).render('user/create', { error: 'Erro ao criar usuário.', user: req.body });
        }
    }
}

export const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUser(id);
        res.render('user/read', { user });
    } catch (error) {
        console.error(error);
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.method === 'GET') {
        try {
            const user = await getUser(id);
            res.render('user/update', { user });
        } catch (error) {
            console.error(error);
        }
    } else if (req.method === 'POST') {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).render('user/update', { error: error.details[0].message, user: { ...req.body, id } });
        }
        try {
            await updateUser(id, value);
            res.redirect('/user');
        } catch (error) {
            console.error(error);
            res.status(500).render('user/update', { error: 'Erro ao atualizar usuário.', user: { ...req.body, id } });
        }
    }
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.method === 'GET') {
        try {
            const user = await getUser(id);
            res.render('user/remove', { user });
        } catch (error) {
            console.error(error);
        }
    } else if (req.method === 'POST') {
        // Aqui só precisa validar se o id existe
        if (!req.body.id) {
            return res.status(400).render('user/remove', { error: 'ID é obrigatório.', user: req.body });
        }
        try {
            await removeUser(req.body.id);
            res.redirect('/user');
        } catch (error) {
            console.error(error);
            res.status(500).render('user/remove', { error: 'Erro ao remover usuário.', user: req.body });
        }
    }
}

export default {
    index,
    create,
    read,
    update,
    remove
};