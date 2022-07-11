import "dotenv/config";
import express, { Request, Response, Express } from "express";
import cors from "cors";
import path from "path";
// @ts-ignore
import helmet from "helmet";
// @ts-ignore
import chalk from "chalk";
// @ts-ignore
import morgan from "morgan";
// @ts-ignore
import * as rfs from "rotating-file-stream";

import config from "./src/config";
import apiRoutes from "./src/routes/router";

const app: Express = express();
const port: string | number = process.env.PORT || 8888;

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
// Set views
app.set("views", path.join(__dirname, "/views"));

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
 * Logger
 */
if (process.env.NODE_ENV === "production") {
    // create a rotating write stream
    var accessLogStream: rfs.RotatingFileStream = rfs.createStream(
        config.logger.fileName,
        config.logger.streamLogOptions
    );
    // setup the logger
    app.use(morgan("combined", { stream: accessLogStream }));
}

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
