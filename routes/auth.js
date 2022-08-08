import { Router } from "express";
import { body, check,param } from "express-validator";
import { googleSignIn, login } from "../controllers/authController.js";
import { fieldValidation } from "../middlewares/fieldValidation.js";


export const router = Router();

router
    .post('/login',[
        check('email','el email es obligatorio').isEmail(),
        check('password','debes ingresar la contraseña').not().isEmpty(),
        fieldValidation
    ],login )
    .post('/google',[
        check('id_token','id_token de Google es necesario').notEmpty(),
        fieldValidation
    ],googleSignIn )
    