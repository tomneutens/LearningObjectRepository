import Logger from "../../logger.js"
import multer from "multer"
import { uploadFilesMiddleware } from "../../utils/upload.js"
import MarkdownProcessor from '../../processors/markdown/markdown_processor.js'
import LearingObject from "../../models/learning_object.js"
import LearningObject from "../../models/learning_object.js"
import fs from "fs"
import path from "path"
import crypto from 'crypto'
import mkdirp from "mkdirp"

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
    for (let i = 0 ; i < files.length ; i++){
        if (files[i]["originalname"].match(indexregex)){
            return files[i];
        }
    }
};


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

            -> If other type than md, look for metadata.md or metadata.yaml 
            
        */
/***
 * TODO: split function -> too many responsabilities
 */
learningObjectController.createLearningObject = async (req, res) => {
    logger.info("Trying to upload files");
    try {
        await uploadFilesMiddleware(req, res);
        logger.info(req.files);
        for (let i = 0 ; i < req.files.length ; i++){

            req.files[i].originalname = path.join(...req.files[i].originalname.split(path.sep).slice(1));
        }
        let indexfile = learningObjectController.findMarkdownIndex(req.files);  // Look for the index markdown file
        let indexfile_html = indexfile.originalname.replace(".md", ".html");     // create filename for index.html page
        let mdString = indexfile.buffer.toString('utf8');   // Read index markdown file into string

        let proc = new MarkdownProcessor();
        let splitdata = proc.stripYAMLMetaData(mdString);   // Strip metadata and markdown from eachother
        let htmlString = proc.render(splitdata.markdown);             // Transform markdown into html

        const learningObject = new LearningObject(splitdata.metadata)   // Save metadata as learning object

        const id = learningObject['_id'].toString();                    
        let destination =  path.join(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION), id); // Use unique learning object id to define storage location
        
        // Write index.html file
        let indexfile_html_full = path.join(destination, indexfile_html);
        mkdirp.sync(path.dirname(indexfile_html_full));
        let writeIndexPromise = new Promise((resolve) => {
            fs.writeFile(indexfile_html_full, htmlString, "utf8", function(err) {
                if (err){
                    console.log(err);
                }
                resolve();
            });
        });
        
        let result = await writeIndexPromise;

        // Save all files source files
        for (const elem of req.files){
            let filename = path.join(destination, elem.originalname);
            mkdirp.sync(path.dirname(filename));
            await new Promise((resolve) => {
                fs.writeFile(filename, elem.buffer, function(err, data){
                    if (err){
                        console.log(err);
                    }
                    resolve();
                });
            });
        }

        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }
        let redirectpath = path.join("/", process.env.LEARNING_OBJECT_STORAGE_LOCATION, id, indexfile_html);
        return res.redirect(redirectpath);
        //return res.sendfile(indexfile_html_full);
        //return res.send(`Files has been uploaded.`);
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