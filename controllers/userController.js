import { request, response } from "express"





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
const userPost = (req, res = response) => {
        
    const {name,age} = req.body
    res.json({
        msg: 'Post API - Controller',
        name,
        age
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