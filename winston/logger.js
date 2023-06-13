const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const appRoot = require('app-root-path');
const { createLogger } = require('winston');
const process = require('process');
const logDir = `${appRoot}/logs`;
const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({
      label: 'LMS',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      // log file configuration
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.log',
      maxSize: '20m', // 로그파일 크기 초과시 앞의 데이터를 지움
      maxFiles: '30d', // 최근 30일치 로그 파일만 보관
      zippedArchive: true,
    }),
    new winstonDaily({
      // log file configuration
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.error.log',
      maxSize: '20m', // 로그파일 크기 초과시 앞의 데이터를 지움
      maxFiles: '30d', // 최근 30일치 로그 파일만 보관
      zippedArchive: true,
    }),
  ],
});

// * 개발 환경일 경우, 터미널에서도 로그 확인할 수 있도록 설정(process 모듈 사용)
if (process.env.NODE_ENV != 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 로그 출력시 구분할 수 있도록 색상 추가
        winston.format.simple() // 메세지 형태를 단순하게 설정, prod이 아닐 경우 폴더와 터미널창에서 로그를 확인할 수 있도록
      ),
    })
  );
}

module.exports = logger;
