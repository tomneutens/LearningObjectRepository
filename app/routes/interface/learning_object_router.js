import express from "express"
import learningObjectController from "../../controllers/interface/learning_object_controller.js"
import Logger from "../../logger.js"

let logger = Logger.getLogger()
let learningObjectRouter = express.Router({mergeParams: true});

learningObjectRouter.route("/create").get((req, res) => {
    learningObjectController.getCreateLearningObject(req, res);
})

learningObjectRouter.route("/create").post((req, res) => {
    learningObjectController.createLearningObject(req, res);
})

export default learningObjectRouter;