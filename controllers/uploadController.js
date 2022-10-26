import { response } from "express";
import { removeOldImage, uploadFile } from "../helpers/upload-files.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import path from "path";
import fs from 'fs'
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileUpload = async (req, res = response) => {
  console.log(req.files);

  try {
    const pathFile = await uploadFile(req.files, undefined, "imgs");

    res.json({ pathFile });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const UpdateFile = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  let pathImage;

  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `no existe un usuario con el id ${id}`,
        });
      }
      pathImage = await uploadFile(req.files, undefined, collection);
      removeOldImage(collection, model);
      await User.findByIdAndUpdate(id, { img: pathImage });
      break;
    case "product":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `no existe un producto con el id ${id}`,
        });
      }
      pathImage = await uploadFile(req.files, undefined, collection);
      removeOldImage(collection, model);
      await Product.findByIdAndUpdate(id, { img: pathImage });

      break;

    default:
      return res.status(500).json({ msg: "se me olvido validar esto" });
  }

  res.json(`la imagen del ${collection} : ${id} fue cambiada por ${pathImage}`);
};

const showImage = async(req, res = response ) => {
  const {collection,id} = req.params

  let model;


  const returnImage = (collection,model) => {

    if(model.img ){
  
      const pathImage = path.join(__dirname, "../uploads/", collection, model.img);
      const notImage = path.join(__dirname,'../assets/','no-image.jpg')
  
      if(fs.existsSync(pathImage)){
        return res.sendFile(pathImage)
      }
      res.sendFile(notImage)
  }

  }


  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `no existe un usuario con el id ${id}`,
        });
      }  
      returnImage(collection, model);
  
      break;
    case "product":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `no existe un producto con el id ${id}`,
        });
      }
  
      returnImage(collection, model);
 
      break;
    default:
      return res.status(500).json({ msg: "se me olvido validar esto" });
  }

 
};

export { fileUpload, UpdateFile,showImage };
