import Logger from "../../logger.js"
import multer from "multer"
import { uploadFilesMiddleware } from "../../utils/upload.js"
import MarkdownProcessor from '../../processors/markdown/markdown_processor.js'
import LearingObject from "../../models/learning_object.js"
import LearningObject from "../../models/learning_object.js"

let logger = Logger.getLogger()

let learningObjectController = {}

learningObjectController.readLearningObject = (req, res) => {

};

learningObjectController.getCreateLearningObject = (req, res) => {
    res.render('interface/learning_object/learning_object.create.ejs', {
        hello: "Hello learning object!"
    });
};

learningObjectController.findMarkdownIndex = (files) => {
    let indexregex = /.*index.md$/
    let indexfile;
    for (let i = 0 ; i < files.length ; i++){
        if (files[i]["originalname"].match(indexregex)){
            return files[i];
        }
    }
};

learningObjectController.createLearningObject = async (req, res) => {
    logger.info("Trying to upload files");
    try {
        await uploadFilesMiddleware(req, res);
        logger.info(req.files);
        let indexfile = learningObjectController.findMarkdownIndex(req.files);
        let mdString = indexfile.buffer.toString('utf8');
        let proc = new MarkdownProcessor();
        let splitdata = proc.stripYAMLMetaData(mdString);
        const learningObject = new LearningObject(splitdata.metadata)

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