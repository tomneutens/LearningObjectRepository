import express from 'express'
import path from 'path'
import Logger from './logger.js'
import appRouter from './routes/app_router.js'
import ltijs from "ltijs"

const logger = Logger.getLogger();
const lti = ltijs.Provider;

lti.setup('LTIKEY',
    {   // db config
        url: process.env.DATABASE_URL
    },
    {
        staticPath: path.join(path.resolve(), './static'), // Path to static files
        cookies: {
            secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
            sameSite: 'None' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
        },
        devMode: true, // Set DevMode to true if the testing platform is in a different domain and https is not being used7
        appRoute: '/test'
    });

// When receiving successful LTI launch redirects to app
lti.onConnect(async (token, req, res) => {
    console.log(token)
    return res.sendFile(path.join(path.resolve(), './static/html/test.html'))
})

lti.onInvalidToken(async (req, res, next) => { 
    console.log("Error")
    return res.status(401).send(res.locals.err)
  }
)

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
    return res.send('Deep Linking is working!');
    //return lti.redirect(res, '/deeplink', { newResource: true })
})

await lti.deploy({ serverless: true });

console.log("LTI info: " + lti.appRoute() + " " + lti.loginRoute() + " " + lti.keysetRoute())

// Example on how to register a platfor for our tool
let plat = await lti.registerPlatform({
    url: 'https://platform.url',
    clientId: 'TOOLCLIENTID',
    name: 'Platform Name',
    authenticationEndpoint: 'https://platform.url/auth',
    accesstokenEndpoint: 'https://platform.url/token',
    authConfig: { method: 'JWK_SET', key: 'https://platform.url/keyset' }
})

logger.info(`Running from directory: ${path.resolve(process.cwd())}`)
logger.info(`Running in ${process.env.NODE_ENV} environment`)

const app = express();

// use lti middleware
app.use('/lti', lti.app);

app.use('/', appRouter);
app.use('/storage', express.static(path.join(path.resolve(), "storage")))
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