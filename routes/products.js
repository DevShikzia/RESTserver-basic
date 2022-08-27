import { Router } from "express";
import { check } from "express-validator";

import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController.js";


import { validateJWT, fieldValidation,hasRole, isAdminRole } from "../middlewares/index.js";
import { isValidEmail, isValidRole, isValidProductId, isValidCategoryId } from "../helpers/db-valiations.js";


export const router = Router();


/*
  {{url}}/api/categories

*/

// Obtener todas las categories = publico

router
.get('/',getAllProducts)


// Obtener una categoria por id = publico
.get('/:id',[check('id', 'No es un ID valido').isMongoId().bail(),  
  check('id').bail().custom((id) => isValidProductId(id)).bail(),
fieldValidation],getOneProduct)


// Crear producto = privado con cualquier token valido

.post('/',[
    validateJWT,
    check('name','el nombre es obligatorio').notEmpty(),
    check('category','debes indicar la categoria').notEmpty(),
    check('category','no es un id de mongo valido').isMongoId(),
    check('category').custom(id => isValidCategoryId),
    fieldValidation, ],
    createProduct)

// Actualizar = privado con cualquier token valido 

.put('/:id', [ 
  validateJWT,
  check('name','el nombre es obligatorio').notEmpty(),
  check('category','debes indicar la categoria').notEmpty(),
  hasRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId().bail(),
   check('id').bail().custom((id) => isValidProductId(id)).bail(),
   fieldValidation,
  ],updateProduct)

// Borrar uan categoria = admin

.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'No es un ID valido').isMongoId().bail(),
   check('id').bail().custom((id) => isValidProductId(id)).bail(),
   fieldValidation,
],deleteProduct)