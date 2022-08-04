import { Router } from "express";
import { body, check,param } from "express-validator";


// import {fieldValidation} from "../middlewares/fieldValidation.js"
// import { validateJWT } from "../middlewares/validateJWT.js";
// import { isAdminRole, hasRole } from "../middlewares/validateRole.js";

import { fieldValidation,validateJWT, hasRole,isAdminRole } from "../middlewares/index.js";

import { isValidEmail, isValidRole, isValidUserId } from "../helpers/db-valiations.js";


import { userDelete,
        userGet, 
        userPatch, 
        userPost,
         userPut } from "../controllers/userController.js";


export const router = Router();


  router
       .get('/', userGet)
       .put('/:id',[
         check('id', 'No es un ID valido').isMongoId().bail(),
         check('id').bail().custom((id) => isValidUserId(id)).bail(),
         body('role').custom( isValidRole),  

        fieldValidation
       ], userPut)
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
       .delete('/:id',[
         validateJWT,
        //  isAdminRole,
        hasRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id', 'No es un ID valido').isMongoId().bail(),
         check('id').bail().custom((id) => isValidUserId(id)).bail(),
         fieldValidation,

       ] ,userDelete)

