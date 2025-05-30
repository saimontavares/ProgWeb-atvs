import { NextFunction, Request, Response } from "express";
import fsPromises from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

type LoggerType = 'complete' | 'simple';

function logger(type: LoggerType) {
    const PATH_LOGS = process.env.PATH_LOGS || './logs';
    if (type === 'simple') {
        return async (req: Request, _res: Response, next: NextFunction) => {
            const dateTime = (new Date()).toISOString();
            await fsPromises.writeFile(`${PATH_LOGS}/logs.log`, `${dateTime} ${req.url} ${req.method}\n`, { flag: 'a' });
            console.log("log as simple");
            next();
        };
    } else if (type === "complete") {
        return async (req: Request, _res: Response, next: NextFunction) => {
            const dateTime = (new Date()).toISOString();
            await fsPromises.writeFile(`${PATH_LOGS}/logs.log`, `${dateTime} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')}\n`, { flag: 'a' });
            console.log("log as complete");
            next();
        };
    } else {
        throw new Error("Invalid logger type");
    }
}

export default logger;