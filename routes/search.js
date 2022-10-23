import { Router } from "express"
import { search } from "../controllers/searchController.js";

export const router = Router();


router
   .get('/:collection/:section',search)



