import express from "express"
import learningObjectApiController from "../../controllers/api/learing_object_api_controller.js"
let learningObjectApiRouter = express.Router({mergeParams: true});

learningObjectApiRouter.route("/getContent/:id").get((req, res) => {
    learningObjectApiController.getLearningObject(req, res);
});

learningObjectApiController.rout("/getMetadata/:id").get((req, res) => {
    learningObjectApiController.getMetadata(req, res);
});

export default learningObjectApiRouter;