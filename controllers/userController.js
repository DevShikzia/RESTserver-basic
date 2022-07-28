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


const userPut = (req, res = response) => {
      
   const {id} = req.params

    res.json({
        msg: 'Put API - Controller',
        id
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
      
  await user.save() // Se guarda en la BD
 
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