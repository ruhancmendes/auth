//Middleware para garantir que o usuário está autenticado

import { AppError } from "@/utils/AppError"
import e, { Request, Response, NextFunction } from "express"

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError("JWT token is missing", 401)
    }

    const [,token] = authHeader.split(" ")
    
    console.log( token )
    
    return next()
}

export { ensureAuthenticated }