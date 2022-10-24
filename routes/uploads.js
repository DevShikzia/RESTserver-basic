import { Router } from "express";
import {  check,} from "express-validator";
import { fileUpload } from "../controllers/uploadController.js";
import { fieldValidation } from "../middlewares/fieldValidation.js";


export const router = Router();

router
    .post('/',fileUpload)