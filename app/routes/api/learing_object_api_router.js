import express from "express"
import learningObjectApiController from "../../controllers/api/learing_object_api_controller.js"
let learningObjectApiRouter = express.Router({mergeParams: true});

learningObjectApiRouter.route("/get").get((req, res) => {
    learningObjectApiController.getLearningObject(req, res);
})

export default learningObjectApiRouter;