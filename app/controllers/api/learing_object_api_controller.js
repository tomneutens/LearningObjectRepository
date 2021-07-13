import Logger from "../../logger.js"
import path from "path"

let logger = Logger.getLogger()

let learningObjectApiController = {}

learningObjectApiController.getLearningObject = (req, res) => {
    let id = req.params.id;
    let redirectpath = path.join("/", process.env.LEARNING_OBJECT_STORAGE_LOCATION, id);
    return res.redirect(redirectpath);
};

learningObjectApiController.getMetadata = (req, res) => {
    
};


export default learningObjectApiController;