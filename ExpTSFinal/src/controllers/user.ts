import { Request, Response } from 'express'
import { getAllUsers, getUser, createUser, updateUser, removeUser, checkCredentials } from '../services/user'
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from '../types/user'
import { userSchema } from '../validators/userValidator'
import { getAllMajors } from '../services/major'

export const index = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.render('user/index', { users });
}

export const create = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        const majors = await getAllMajors();
        res.render('user/create', { majors });
    } else if (req.method === 'POST') {
        try {
            const user = await createUser(req.body as CreateUserDto);
            res.redirect('/user');
        } catch (error) {
            console.error(error);
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
        // if (error) {
        //     return res.status(400).render('user/update', { error: error.details[0].message, user: { ...req.body, id } });
        // }
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
    if (req.method === 'POST') {
        try {
            await removeUser(id);
            res.redirect('/user');
        } catch (error) {
            console.error(error);
        }
    }
}

const signup = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        const majors = await getAllMajors();
        res.render('user/signup', { majors });
    }
    else if (req.method === 'POST') {
        try {
            const user = await createUser(req.body as CreateUserDto);
            res.redirect('/user/login');
        } catch (error) {
            console.error(error);
            res.status(500).render('user/signup', { error: 'Erro ao criar usuário.' });
        }
    }
}

const login = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render('user/login');
    }
    else if (req.method === 'POST') {
        const { email, password } = req.body;
        const ok = await checkCredentials(email, password);
        if (ok) {
            req.session.logado = true;
            res.redirect('/');
        }
    }
}
const logout = async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    })
}

export default {
    index,
    create,
    read,
    update,
    remove,
    login,
    logout,
    signup
};