import { JwtPayload } from "jsonwebtoken"

export interface IUserSecurityProvider {
    comparePass(email: string, password: string): Promise<boolean>
    configureJWT(id: string, email?: string): string | JwtPayload
    encryptPass(password: string): Promise<string>
    decodeJWT(token: string): string | JwtPayload
}