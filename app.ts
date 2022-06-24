import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import chalk from "chalk";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";

import config from "./src/config";
import apiRoutes from "./src/routes/router";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

// Security configuration
app.disable("x-powered-by");
app.use(cors(config.corsOptions));
app.use(helmet());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

/**
 * Logger
 */
// create a rotating write stream
var accessLogStream = rfs.createStream(
    config.logger.fileName,
    config.logger.streamLogOptions
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// API Routing
app.use("/api", apiRoutes);

// Default response -> HTTP_NOT_FOUND 404 & render 404.html page
app.use((req: Request, res: Response) => {
    return res
        .status(404)
        .sendFile(path.join(__dirname, "/src/views/errors/404.html"));
});

// Errors handler
app.use(config.errorHandler);

/**
 * You can check the database connection before run the server
 * Using CHALK to display the error message, easy to read and debug.
 */
const server = app.listen(port, () => {
    console.log(
        chalk.bgYellow.black.bold(
            `Backend server is listening on port ${port}...`
        )
    );
    console.log(chalk.bold.blue(`http://localhost:${port}`));
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
