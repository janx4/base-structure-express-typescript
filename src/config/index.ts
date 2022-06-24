import corsOptions from "./cors";
import loggerConfig from "./logger";
import errorHandler from "./errorHandler";
import swaggerConfig from "./swagger";

export default {
    corsOptions,
    logger: loggerConfig,
    swagger: swaggerConfig,
    errorHandler,
};
