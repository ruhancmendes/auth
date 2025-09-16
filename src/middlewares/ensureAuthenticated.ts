//Middleware para garantir que o usuário está autenticado

import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { authConfig } from "@/configs/auth"

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError("JWT token is missing", 401)
    }

    const [,token] = authHeader.split(" ")
    
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
        id: String(user_id)
    }
    
    return next()
}

export { ensureAuthenticated }