import app from './app.js'
import http from 'http'
import https from 'https'
import fs from "fs"
import Logger from './logger.js'
import { connectDb, models } from "./models/db_connection.js"

let logger = Logger.getLogger();

// Certificate options for ssl
var options = {
    key: fs.readFileSync(process.env.KEY_FILE),
    cert: fs.readFileSync(process.env.CERT_FILE),
    //ca: fs.readFileSync(process.env.CA_FILE)
  };

// Connect to database
connectDb().then(async () => {
    if (process.env.ERASE_DATABASE_ON_SYNC == true){ 
        await Promise.all([
            models.LearningObject.deleteMany({})
          ]);
    }
    logger.info("Database connection established");
    startServer();
});

let startServer = () => {
    http.createServer(app).listen(process.env.HTTP_PORT, () => {
        logger.info(`Running http server on port ${process.env.HTTP_PORT}`);
    });
    https.createServer(options, app).listen(process.env.HTTPS_PORT, () => {
        logger.info(`Running https server on port ${process.env.HTTPS_PORT}`);
    });
}
