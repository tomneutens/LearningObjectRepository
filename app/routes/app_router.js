import express from 'express';
import learningObjectRouter from "./interface/learning_object_router.js"
import learningObjectApiRouter from "./api/learing_object_api_router.js"

let appRouter = express.Router();

// // Set default API response
appRouter.get('/', function (req, res) {
    res.json({
        status: 'The system is working!',
        message: 'To the moon and back.'
    });
});

appRouter.use("/interface/learningObject", learningObjectRouter);
appRouter.use("/api/learningObject", learningObjectApiRouter);

export default appRouter;