import { request, response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const validateJWT = async(req = request,res = response, next) => {


    const token = req.header('x-token');

    if(!token) {

        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    };

    try {
        
          const {uid} =  jwt.verify(token, process.env.SECRETKEY)
            
          
          const user = await User.findById(uid);
         
          //verifico si existe

          if(!user){
            return res.status(401).json({
                msg:'token no valido - user no existe en la BD'
            })
          }


          //verificar si el uid tiene estado true

           if(!user.state) {
            return res.status(401).json({
              msg:'token no valido - state: false'
            })
           }


          req.user = user   
         next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "token no valido"
        })
    }



};