import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

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

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const uploadPath = path.join(__dirname, "../uploads/", folder, newName);


    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(newName);
    });
  });
};

export {
    uploadFile
}
