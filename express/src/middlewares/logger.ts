import { NextFunction, Request, Response } from "express";

type LoggerType = 'complete' | 'simple';

function logger(type: LoggerType){
    if(type === 'simple'){
        return (req: Request, res: Response, next: NextFunction) => {
            console.log("log as simple");
            next();
        };
    } else if(type === "complete"){
        return (req: Request, res: Response, next: NextFunction) => {
            console.log("log as complete");
            next();
        };
    }
}

export default logger;