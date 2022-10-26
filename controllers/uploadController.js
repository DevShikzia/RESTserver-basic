import { response } from "express";
import { uploadFile } from "../helpers/upload-files.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";

const fileUpload = async(req,res = response) => {

    console.log(req.files)
 
  
    try {

      const path = await uploadFile(req.files,undefined,'imgs')

      res.json({ path})
      
    } catch (msg) {
      res.status(400).json({ msg })
    }


}


const UpdateFile = async(req, res = response ) => {

  const {id,collection} = req.params


  let model;
  const path = await uploadFile(req.files,undefined,collection)

  switch (collection) {
    case 'user':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `no existe un usuario con el id ${id}`
          });
       }
      await User.findByIdAndUpdate(id,{img:path});
      break;
   case 'product':
       model = await Product.findById(id)
       if (!model) {
          return res.status(400).json({
            msg: `no existe un producto con el id ${id}`
          });
       }
       
      await Product.findByIdAndUpdate(id,{img:path})
       
      break;
  
    default:
      return res.status(500).json({msg: 'se me olvido validar esto'})
  }

  res.json(`la imagen del ${collection} : ${id} fue cambiada por ${path}`)
}


export {
    fileUpload,
    UpdateFile
}