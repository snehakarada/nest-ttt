import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class Logger implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} ${req.originalUrl}`)
        next();
    }
}

@Injectable()
export class CreateSession implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.cookie('playerName', req.body.playerName)
        console.log("*".repeat(5), "created cookie successfully", "*".repeat(5))
        next()
    }
}

// @Injectable()
// export class moveChecking implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {

//     }
// }