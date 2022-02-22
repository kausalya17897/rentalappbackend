import { response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
export const auth=(request,response,next)=>{
    
try
{
    const token=request.header("x-auth-token");
   console.log("tokens",token)
   jwt.verify(token,process.env.SECRET_KEY)
   next();
}
catch(err)
{
    response.status(404).send({error:err.message});
}
};