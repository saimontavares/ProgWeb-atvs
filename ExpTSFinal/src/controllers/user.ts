import { Request, Response } from 'express'
import { getAllUsers, getUser, createUser, updateUser, removeUser, checkCredentials, getUserByEmail, gameSession as saveGameSession, getRanking} from '../services/user'
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from '../types/user'
import { userSchema } from '../validators/userValidator'
import { getAllMajors } from '../services/major'
import { GameSession } from '@prisma/client'

export const index = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.render('user/index', { users, user: req.session.user, logado: req.session.logado });
}

export const create = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        const majors = await getAllMajors();
        res.render('user/create', { majors });
    } else if (req.method === 'POST') {
        try {
            const user = await createUser(req.body as CreateUserDto);
            res.redirect('/login');
        } catch (error) {
            console.error(error);
        }
    }
}

export const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUser(id);
        res.render('user/read', { user, userSession: req.session.user, logado: req.session.logado });
    } catch (error) {
        console.error(error);
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.method === 'GET') {
        try {
            const user = await getUser(id);
            const majors = await getAllMajors();
            res.render('user/update', { user, majors });
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
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).render('user/update', { error: 'Erro ao atualizar usuário.', user: { ...req.body, id }, userSession: req.session.user, logado: req.session.logado });
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
            //console.log('Usuário criado:', user);
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
                    //console.log('Usuário logado:', user);
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
    res.render('ranking', { ranking, user: req.session.user, logado: req.session.logado });
};

const game = async (req: Request, res: Response) => {
    if (!req.session.logado) {
        return res.redirect('/user/login');
    }
    res.render('index', { layout:"main", user: req.session.user, logado: req.session.logado });
}

const changePassword = async (req: Request, res: Response) => {
    if (!req.session.user) {
        return res.redirect('/user/login');
    }

    if (req.method === 'GET') {
        return res.render('user/changePassword', { user: req.session.user, logado: req.session.logado });
    }

    if (req.method === 'POST') {
        // Só executa a lógica de alteração de senha se vier do formulário de change-password
        if ('currentPassword' in req.body && ('confirmPassword' in req.body || 'repeatNewPassword' in req.body)) {
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const confirm = req.body.confirmPassword || req.body.repeatNewPassword;
            try {
                if (typeof currentPassword === 'string' && typeof newPassword === 'string' && typeof confirm === 'string') {
                    // Verifica se a senha atual está correta
                    const isValid = await checkCredentials(req.session.user.email, currentPassword);
                    if (!isValid) {
                        return res.status(400).render('user/changePassword', { 
                            error: 'Senha atual incorreta.', 
                            user: req.session.user, 
                            logado: req.session.logado 
                        });
                    }

                    if (newPassword !== confirm) {
                        return res.status(400).render('user/changePassword', { 
                            error: 'As novas senhas não coincidem.', 
                            user: req.session.user, 
                            logado: req.session.logado 
                        });
                    }

                    // Atualiza a senha do usuário
                    await updateUser(req.session.user.id, { password: newPassword });
                    return res.redirect('/');
                }
            } catch (error) {
                console.error(error);
                return res.status(500).render('user/changePassword', { 
                    error: 'Erro ao trocar a senha.', 
                    user: req.session.user, 
                    logado: req.session.logado 
                });
            }
        } else {
            // Se não for alteração de senha, apenas segue o fluxo normal (ex: cadastro)
            return res.redirect('/');
        }
    }
}

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
    ranking,
    game,
    changePassword
};