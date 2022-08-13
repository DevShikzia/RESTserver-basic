import {request, response } from "express";
import {User} from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generateJWT.js";
import {GoogleVerify} from "../helpers/google-verify.js";


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

const googleSignIn = async(req = request, res = response) => {
     
    const {id_token} = req.body;

    try {
      const {name,img,email,role} = await GoogleVerify(id_token);      
      
      let user = await User.findOne({email});

      if (!user) {
        
       const data = {
        name,
        email,
        password:':P',
        img,
        google:true,
        role : 'USER_ROLE',

       };

       user = new User(data)
       await user.save()

      }

        // si el usuario en DB 
        if(!user.state){
            return res.status(401).json({
                msg:'Hable con el administrador - USER-BLOCKED'
            })
        }

        //Generar el JWT

        const token = await generateJWT(user.id)

     
        res.json({
          user,
          token
        })
          
    } catch (error) { 
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'el token de google no se pudo verificar'
        })
    }

}





export {
    login,
    googleSignIn
}


