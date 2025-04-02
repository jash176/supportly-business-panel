import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ROOT_DIR } from "../dirname";
const createMulterUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, path.resolve(ROOT_DIR, "../../public"));
    },
    filename: (req, file, cb) => {
      // console.log(file);
      const fileExtension = file.originalname.split(".").pop() || "";
      const fileName = `${uuidv4()}.${fileExtension}`;
      cb(null, fileName);
    },
  });

  const upload = multer({ storage });

  return upload;
};

//For Single upload
export const uploadSingleFile = (fieldName: string) => {
  return createMulterUploader().single(fieldName);
};

//Fir Multiple fields upload
export const uploadMultipleFiles = (arrayOfFields: multer.Field[]) => {
  return createMulterUploader().fields(arrayOfFields);
};

/**
 * Deletes a file from the public folder.
 * @param {string} fileName - The name of the file to delete.
 * @returns {Promise<string>} - Resolves with success message or rejects with an error message.
 */
export const deleteFileFromPublic = (fileName: string) => {
  return new Promise((resolve, reject) => {
    // Define the file path
    const filePath = path.join(ROOT_DIR, "../..", fileName);
    console.log("File Path: ", filePath);
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return reject(`File not found: ${fileName}`);
      }

      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          return reject(`Error deleting file: ${err.message}`);
        }
        resolve(`File deleted successfully: ${fileName}`);
      });
    });
  });
};
