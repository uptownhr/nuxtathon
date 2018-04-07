const winston = require('winston');
winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${process.env.LOG_PATH}/api.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.info('writting logs to:', process.env.LOG_PATH)

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.debug(message);
  }
};