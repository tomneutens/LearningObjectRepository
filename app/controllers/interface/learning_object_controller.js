import Logger from "../../logger.js"
import multer from "multer"
import { uploadFilesMiddleware } from "../../utils/upload.js"

let logger = Logger.getLogger()

let learningObjectController = {}

learningObjectController.readLearningObject = (req, res) => {

};

learningObjectController.getCreateLearningObject = (req, res) => {
    res.render('interface/learning_object/learning_object.create.ejs', {
        hello: "Hello learning object!"
    });
};


learningObjectController.createLearningObject = async (req, res) => {
    logger.info("Trying to upload files");
    try {
        await uploadFilesMiddleware(req, res);
        logger.info(req.files);

        /*
            TODO: process files:
            -> look for main markdown file and extract metadata;
            -> check validity of the different files;
            -> if correct file structure/types:
            -> Generate learning object based on metadata
            -> Create storage location on disk for this learning object (use uuid)
            -> Save files in that location
            -> add uuid to metadata and save metadata to the database.
            -> return rendered learning object to the user
            
        */

        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }

        return res.send(`Files has been uploaded.`);
    } catch (error) {
        logger.error(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }
};

learningObjectController.updateLearningObject = (req, res) => {

};

learningObjectController.deleteLearningObject = (req, res) => {

};

export default learningObjectController;