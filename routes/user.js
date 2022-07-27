import { Router } from "express";

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
       .post('/', userPost)
       .delete('/', userDelete)

