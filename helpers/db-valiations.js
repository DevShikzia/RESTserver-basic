import { Role } from "../models/role.js";
import {User} from "../models/user.js"



const isValidRole = async(role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole){
      throw new Error(`el role ${role} no esta registrado en la DB`)
    }
}


const isValidEmail = async(email = '') => {
  const existeEmail = await User.findOne({email});
  
    if (existeEmail) {
      throw new Error('Ese mail ya esta en uso')
    }
}



export {
    isValidRole,
    isValidEmail
}