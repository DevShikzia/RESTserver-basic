import { Router } from "express";
import {body, check,param } from "express-validator";

import {  createCategory, deleteCategory,updateCategory, GetAllCategory, GetOneCategory } from "../controllers/categoryController.js";


import { validateJWT, fieldValidation,hasRole, isAdminRole } from "../middlewares/index.js";
import { isValidEmail, isValidRole, isValidCategoryId } from "../helpers/db-valiations.js";


export const router = Router();


/*
  {{url}}/api/categories

*/

// Obtener todas las categories = publico

router
.get('/', GetAllCategory)


// Obtener una categoria por id = publico
.get('/:id',[check('id', 'No es un ID valido').isMongoId().bail(),  
  check('id').bail().custom((id) => isValidCategoryId(id)).bail(),
fieldValidation],GetOneCategory)


// Crear categoria = privado con cualquier token valido

.post('/',[
    check('name','el nombre es obligatorio').notEmpty(),
    validateJWT,
    fieldValidation, ],
    createCategory)

// Actualizar = privado con cualquier token valido 

.put('/:id', [ 
  validateJWT,
  check('name','el nombre es obligatorio').notEmpty(),
  hasRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId().bail(),
   check('id').bail().custom((id) => isValidCategoryId(id)).bail(),
   fieldValidation,
  ],updateCategory)

// Borrar uan categoria = admin

.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'No es un ID valido').isMongoId().bail(),
   check('id').bail().custom((id) => isValidCategoryId(id)).bail(),
   fieldValidation,
], deleteCategory)


