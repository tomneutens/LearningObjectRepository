import express from "express"
import learningObjectApiController from "../../controllers/api/learing_object_api_controller.js"
let learningObjectApiRouter = express.Router({mergeParams: true});

learningObjectApiRouter.route("/get/:id").get((req, res) => {
    let id = req.query.id;
    
    learningObjectApiController.getLearningObject(req, res);
})

export default learningObjectApiRouter;