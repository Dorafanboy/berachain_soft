import { format } from 'winston';
import winston = require('winston');
import { customLoggerData } from './loggerData';

const logger = winston.createLogger({
    levels: customLoggerData.levels,
    format: format.combine(
        format.colorize({ level: true, colors: customLoggerData.colors }),
        format.printf(({ level, message }) => {
            const timestamp = new Date().toLocaleString();
            return `[${timestamp}]\t${level}\t${message}`;
        }),
    ),
    transports: [new winston.transports.Console({ level: 'SUCCESS' })],
});

export function printSuccess(message: string) {
    logger.log('SUCCESS', message);
}

export function printError(message: string) {
    logger.log(`ERROR`, message);
}

export function printInfo(message: string) {
    logger.log('INFO', message);
}
