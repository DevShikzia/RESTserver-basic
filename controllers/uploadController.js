import { response } from "express";
import { uploadFile } from "../helpers/upload-files.js";

const fileUpload = async(req,res = response) => {

    console.log(req.files)
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({ mgs:'No files were uploaded.'});
      return;
    }
  
    
  const path = await uploadFile(req.files)

  res.json({ path})
}


export {
    fileUpload
}