import { request, response } from "express";
import {User} from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generateJWT.js";


const login = async(req,res = response) => {

    const {email,password} = req.body
     
        try {

            //verificar si el mail existe
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({
                    msg: 'Usuario/password no son correctos - Email'
                })
            }

            // si el usuario esta activo
            
            if(!user.state){
            return res.status(400).json({
                    msg: 'Usuario/password no son correctos - status: false'
                })
            }
            //verificar contraseña
            const validPassword = bcryptjs.compareSync(password,user.password);
            if(!validPassword){

                return res.status(400).json({
                    msg: 'Usuario/password no son correctos - password'
                })
            }

            //general el JWT

              const token = await generateJWT(user.id)
            
            res.json({
                user,
                token
            })



        } catch (error) {
             
            console.log(error);

            return res.status(500).json({
                msg:'Hable con el administrador'
            })
        }





}




export {
    login
}