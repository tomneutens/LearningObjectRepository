import util from "util"
import path from "path"
import multer from "multer"

/*var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(`${path.resolve()}/${process.env.LEARNING_OBJECT_STORAGE_LOCATION}`));
    },
    filename: (req, file, callback) => {
      const match = ["image/png", "image/jpeg", "text/markdown"]; // TODO: specify supported files
  
      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} Not a supported file format.`;
        return callback(message, null);
      }
  
      var filename = `${Date.now()}-learning-object-${file.originalname}`;
      callback(null, filename);
    }
  });*/

  var storage = multer.memoryStorage()

  var fileFilter = (req, file, callback) => {
    console.log(JSON.stringify(file));
    callback(null, true)
  };
  
  var uploadFiles = multer({ storage: storage, fileFilter: fileFilter, preservePath: true }).array("multi-files", 10);
  var uploadFilesMiddleware = util.promisify(uploadFiles);

export { uploadFilesMiddleware }