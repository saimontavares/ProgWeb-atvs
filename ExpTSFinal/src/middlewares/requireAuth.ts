import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para proteger rotas restritas.
 * Permite acesso apenas se req.session.logado === true.
 * Caso contrário, redireciona para a página de login.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.logado) {
        return next();
    }
    return res.redirect('/user/login');
}
