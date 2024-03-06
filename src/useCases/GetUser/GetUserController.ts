import { GetUserUseCase } from "./GetUserUseCase";
import { Request, Response } from "express";

export class GetUserController {
 constructor( 
  private getUserUseCase: GetUserUseCase
 ){}
 
 async handle(request: Request, response: Response): Promise<Response> {
  const token = request.headers.authorization 
  const session = request.headers.session as string

  try {
    const user = await this.getUserUseCase.execute(
     token,
     session
    )
    return response.status(200).json(user)
    
  } catch (error) {
    return response.status(404).json({message: error.message || "Unexpected error"})
  }
 }
}