import path from "path";
import fs from 'fs'
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { response } from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFile = (
  files = '',
  allowedExtensions = ["png", "jpg", "jpeg", "gif", "svg"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const modifyName = file.name.split(".");
    const extension = modifyName[modifyName.length - 1];

    // validate extension

    if (!allowedExtensions.includes(extension)) {
      return reject(
        `the file ${extension} is not validate - ${allowedExtensions}`
      );
    }


    const newName = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", folder, newName);


    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(newName);
    });
  });
};


const removeOldImage = (collection,model) => {

  if(model.img ){

    const pathImage = path.join(__dirname, "../uploads/", collection, model.img);

    if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage)
    }

}
}




export {
    uploadFile,
    removeOldImage,
}
