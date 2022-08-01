import { request, response } from "express"
import {User} from "../models/user.js"
import bcryptjs from "bcryptjs";




const userGet = (req = request, res = response) => {
      
    const {q,apikey,name='not name',page ='1',limit = 5} = req.query;
    res.json({
        msg: 'get API - Controller',
        q,
        apikey,
        name,
        page,
        limit
    });
  }


const userPut = async(req, res = response) => {
      
   const {id} = req.params;

   const {_id,password,google, ...rest} = req.body;


   // TODO: VALIDAR CONTRA BASE DE DATOS

   if(password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password,salt)
   }

   const user = await User.findByIdAndUpdate(id, rest, {new:true})


    res.json({
        msg: 'Put API - Controller',
        user
    });
  }
const userPatch = (req, res = response) => {
      
    res.json({
        msg: 'Patch API - Controller'
    });
  } 
     const userPost = async(req, res = response) => {


        
  const {name,email,password,role} = req.body //destructuring del body - En caso de no querer un argumento usar spread operator ejemople(role, ...resto)

  
  const user = new User({name,email,password,role}); // Creo un usario

       // --  verifico si correo existe --
     

       // -- Encripto contraseña -- 
  
      const salt = bcryptjs.genSaltSync()
      user.password = bcryptjs.hashSync(password,salt)
  
      // Se guarda en la BD

      await user.save() 
 
       res.json({ 
        user
        });
  }


       const userDelete = (req, res = response) => {
      
    res.json({
        msg: 'Delete API - Controller'
    });
  }






  export {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete,

  }