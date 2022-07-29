import { Router } from "express";
import { body, check } from "express-validator";


import {fieldValidation} from "../middlewares/fieldValidation.js"
import { isValidEmail, isValidRole } from "../helpers/db-valiations.js";



import { userDelete,
        userGet, 
        userPatch, 
        userPost,
         userPut } from "../controllers/userController.js";


export const router = Router();


  router
       .get('/', userGet)
       .put('/:id', userPut)
       .patch('/', userPatch)
       .post('/',[ 
        body('name','Debes poner tu nombre').not().isEmpty(),
        body('email','debes poner un correo valido').isEmail(),
        body('email').custom(isValidEmail),
        body('password','debe ser entre 6 y 12 letras').isLength({min:6,max:12}),
        // body('role','no es un Role valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        body('role').custom( isValidRole),  
        fieldValidation
       ],userPost)
       .delete('/', userDelete)

