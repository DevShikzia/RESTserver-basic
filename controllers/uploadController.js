import path from 'path'
import {fileURLToPath} from 'url';


import { response } from "express";

const fileUpload = (req,res = response) => {

    console.log(req.files)
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({ mgs:'No files were uploaded.'});
      return;
    }
  
    
  
    const {file} = req.files;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
   const uploadPath = path.join(__dirname,'../uploads/', file.name)
  
        console.log(uploadPath)

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({err});
      }
  
      res.json({msg:'File uploaded to ' + uploadPath});
    });
}


export {
    fileUpload
}