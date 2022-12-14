import mongoose from 'mongoose';
import { Category,Product } from '../models/index.js';
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

const isValidUserId = async(id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
}

const userExist = await User.findById(id);

if ( !userExist ) {
    throw new Error(`The user with ID '${ id }' doesn't exist`);
}
};


const isValidCategoryId = async(id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
}

const categoryExist = await Category.findById(id);

if ( !categoryExist ) {
    throw new Error(`The category with ID '${ id }' doesn't exist`);
}
};
const isValidProductId = async(id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
}

const productExist = await Product.findById(id);

if ( !productExist ) {
    throw new Error(`The product with ID '${ id }' doesn't exist`);
}
};

// validar colecciones permitidas

const allowedCollections = (collection = '', collections = []) => {

  const included = collections.includes(collection)

  if(!included){
    throw new Error(`La coleccion ${collection} no esta permitida, ${collections}`)
  }
    return true
}

export {
    isValidRole,
    isValidEmail,
    isValidUserId,
    isValidCategoryId,
    isValidProductId,
    allowedCollections
}