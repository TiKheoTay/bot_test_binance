const winston = require("winston");
const { format } = winston;
const path = require("path");

// Định nghĩa các cấp độ log tùy chỉnh
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Định nghĩa màu sắc cho mỗi cấp độ log
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

// Thêm màu sắc vào winston
winston.addColors(colors);

// Định nghĩa format cho logger
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    format.printf((info) => {
        const { timestamp, level, message, coin, step } = info;
        return `${timestamp} [${coin}] [${step}] ${level}: ${message}`;
    })
);

// Tạo một transport tùy chỉnh để ghi log vào các file riêng biệt cho mỗi coin
class CoinFileTransport extends winston.Transport {
    constructor(opts) {
        super(opts);
        this.logDirectory = opts.logDirectory || "logs";
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit("logged", info);
        });

        const fileName = path.join(
            this.logDirectory,
            `${info.coin.toLowerCase().replace("_", "")}.log`
        );
        const logEntry = `${info.timestamp} [${info.step}] ${info.level}: ${info.message}\n`;

        require("fs").appendFile(fileName, logEntry, (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
        });

        callback();
    }
}

// Tạo logger
const logger = winston.createLogger({
    level: "debug",
    levels,
    format: logFormat,
    transports: [
        new CoinFileTransport({
            logDirectory: path.join(process.cwd(), "logs"),
        }),
    ],
});

// Wrap các phương thức logging
const wrappedLogger = {};
Object.keys(levels).forEach((level) => {
    wrappedLogger[level] = (coin, step, message) => {
        logger[level]({ coin, step, message });
    };
});

module.exports = wrappedLogger;
