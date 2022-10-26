import { Router } from "express";
import {  check,} from "express-validator";
import { fileUpload, showImage, UpdateFileCloudinary } from "../controllers/uploadController.js";
import { allowedCollections } from "../helpers/db-valiations.js";
import { fieldValidation } from "../middlewares/fieldValidation.js";
import { validateFiles } from "../middlewares/validateFile.js";


export const router = Router();

router
    .post('/', validateFiles,fileUpload)
    .put('/:collection/:id',validateFiles,[
        check('id', 'No es un ID valido').isMongoId().bail(),
        check('collection').custom(c => allowedCollections(c,['user','product'])),
        fieldValidation
    ], UpdateFileCloudinary)
    .get('/:collection/:id',[
        check('id', 'No es un ID valido').isMongoId().bail(),
        check('collection').custom(c => allowedCollections(c,['user','product'])),
        fieldValidation
    ],showImage)