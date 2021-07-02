import Logger from "../../logger.js"

let logger = Logger.getLogger()

let learningObjectApiController = {}

learningObjectApiController.getLearningObject = (req, res) => {
    logger.info("TODO: retrieve learing object content (rendered version) and send to user");
    res.status(200)
        .send("succes");
};


export default learningObjectApiController;