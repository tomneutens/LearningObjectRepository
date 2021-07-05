import app from './app.js'
import http from 'http'
import https from 'https'
import fs from "fs"
import Logger from './logger.js'
import MarkdownProcessor from './processors/markdown/markdown_processor.js'

let logger = Logger.getLogger();

let proc = new MarkdownProcessor();
let html = proc.render('# heading+');
logger.info(html);

html = proc.render('[Duck Duck Go](https://duckduckgo.com)');
logger.info(html);

html = proc.render('[Learning object](@learning-object/qskfjmiqemfn046)');
logger.info(html);

let procFile = proc.stripYAMLMetaData("---\nlayout: post\ntitle: Blogging Like a Hacker\n---\n\n[Duck Duck Go](https://duckduckgo.com)");
logger.info(JSON.stringify(procFile));


var options = {
    key: fs.readFileSync(process.env.KEY_FILE),
    cert: fs.readFileSync(process.env.CERT_FILE),
    //ca: fs.readFileSync(process.env.CA_FILE)
  };

http.createServer(app).listen(process.env.HTTP_PORT, () => {
    logger.info(`Running http server on port ${process.env.HTTP_PORT}`);
});
https.createServer(options, app).listen(process.env.HTTPS_PORT, () => {
    logger.info(`Running https server on port ${process.env.HTTPS_PORT}`);
});
