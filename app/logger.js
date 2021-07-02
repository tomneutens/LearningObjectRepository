import winston from 'winston'

/**
 * Singleton logger instance
 */
class Logger {
    static logger = 0;
    /**
     * Create logger for the application. 
     * Errors are written to the error.log file.
     * All other output is written to the combined.log file.
     */
    static getLogger(){
        if (this.logger !== 0){
            return this.logger;
        }else{
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                transports: [
                    new winston.transports.File({ filename: 'error.log', level: 'error'}),
                    new winston.transports.File({filename: 'combined.log' }),
                ],
            });

            /**
             * If not in production, log to console.
             */
            if (process.env.NODE_ENV !== 'production'){
                this.logger.add(new winston.transports.Console({
                    format: winston.format.simple(),
                }));
            } 
            return this.logger;
        }
    }
}


export default Logger;