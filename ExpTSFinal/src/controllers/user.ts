import { Request, Response } from 'express'
import { getAllUsers, getUser, createUser, updateUser, removeUser, checkCredentials, getUserByEmail, gameSession as saveGameSession, getRanking} from '../services/user'
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from '../types/user'
import { userSchema } from '../validators/userValidator'
import { getAllMajors } from '../services/major'
import { GameSession } from '@prisma/client'

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
            try {
                const user = await getUserByEmail(email);
                if (user) {
                    req.session.user = user;
                    console.log('Usuário logado:', user);
                    res.redirect('/');
                }
                else {
                    res.status(404).render('user/login', { error: 'Usuário não encontrado.' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).render('user/login', { error: 'Erro ao buscar usuário.' });
            }
        }
        else {
            res.status(401).render('user/login', { error: 'Usuário ou senha inválidos.' });
        }
    }
}
const logout = async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    })
}

const gameSession = async (req: Request, res: Response) => {
    if (req.method === 'POST') {
        const { score } = req.body;
        try {
            if (!req.session.user) {
                throw new Error('Usuário não autenticado');
            }
            await saveGameSession(req.session.user.id, score);
            res.status(200).send('Game session recorded successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error recording game session');
        }
    }
}

export const ranking = async (req: Request, res: Response) => {
    const ranking = await getRanking();
    res.render('user/ranking', { ranking });
};

export default {
    index,
    create,
    read,
    update,
    remove,
    login,
    logout,
    signup,
    gameSession,
    ranking
};