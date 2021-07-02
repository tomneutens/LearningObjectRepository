import express from 'express'
import path from 'path'
import Logger from './logger.js'
import appRouter from './routes/app_router.js'

const logger = Logger.getLogger();

logger.info(`Running from directory: ${path.resolve(process.cwd())}`)
logger.info(`Running in ${process.env.NODE_ENV} environment`)

const app = express();

app.use('/', appRouter);
app.use('/css', express.static(path.join(path.resolve(), 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(path.resolve(), 'app/static/css')));
app.use('/css', express.static(path.join(path.resolve(), 'node_modules/@fortawesome/fontawesome-free/css')));
app.use('/js', express.static(path.join(path.resolve(), 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(path.resolve(), 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(path.resolve(), 'node_modules/@fortawesome/fontawesome-free/js')));
app.use('/js', express.static(path.join(path.resolve(), 'app/static/js')));
app.set('views', path.join(path.resolve(), 'app', 'views'));
app.set('view engine', 'ejs');



export default app