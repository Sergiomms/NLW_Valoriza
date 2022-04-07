import express, { Request, Response, NextFunction, request } from "express";
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
  
  // receber o token
  const authToken = req.headers.authorization
  console.log(authToken);

  // validar se token está preenchido
  if(!authToken){
    return res.status(401).end();
  }

  // validar token
  const [, token] = authToken.split(" ");
  try{
    const { sub } = verify(token, "cf5369d72de67e99791f7a20faaaa054") as IPayload;
    // console.log(decode)

    req.user_id = sub;
    return next();
  } catch(e){
    return res.status(401).end();
  }
  // recuperar infos do usuário

}