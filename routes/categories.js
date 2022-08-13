import { Router } from "express";
import {body, check,param } from "express-validator";

import {  createCategory, deleteCategory, GetAllCategory, GetOneCategory } from "../controllers/categoryController.js";


import { validateJWT, fieldValidation } from "../middlewares/index.js";
import { isValidEmail, isValidRole, isValidCategoryId } from "../helpers/db-valiations.js";


export const router = Router();


/*
  {{url}}/api/categories

*/

// Obtener todas las categories = publico

router
.get('/', GetAllCategory)


// Obtener una categoria por id = publico
.get('/:id',[  check('id').bail().custom((id) => isValidCategoryId(id)).bail(),
fieldValidation],GetOneCategory)


// Crear categoria = privado con cualquier token valido

.post('/',[
    check('name','el nombre es obligatorio').notEmpty(),
    validateJWT,
    fieldValidation, ],
    createCategory)

// Actualizar = privado con cualquier token valido 

.put('/:id', (req, res) =>{
    
    res.json('put')
})

// Borrar uan categoria = admin

.delete('/:id', deleteCategory)


