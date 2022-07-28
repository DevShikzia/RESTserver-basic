import { request, response } from "express"
import {User} from "../models/user.js"




const userGet = (req = request, res = response) => {
      
    const {q,apikey,name='not name',page ='1',limit = 5} = req.query;
    res.json({
        msg: 'get API - Controller',
        q,
        apikey,
        name,
        page,
        limit
    });
  }


const userPut = (req, res = response) => {
      
   const {id} = req.params

    res.json({
        msg: 'Put API - Controller',
        id
    });
  }
const userPatch = (req, res = response) => {
      
    res.json({
        msg: 'Patch API - Controller'
    });
  }
const userPost = async(req, res = response) => {
        
  const body = req.body
  const user = new User(body);
         await user.save()
        res.json({
          user
        });
  }
const userDelete = (req, res = response) => {
      
    res.json({
        msg: 'Delete API - Controller'
    });
  }






  export {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete,

  }