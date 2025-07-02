import { NextFunction, Request, Response } from "express";

const cheackAuth = (req : Request, res : Response, next : NextFunction) => {
    if (req.session.logado === true) {
        next();
    }
    else res.status(403).send('Acesso negado.')
}