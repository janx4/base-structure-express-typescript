import express, { Express } from "express";
import testRouter from "./test.route";

const apiRoute: Express = express();

// Inludes all router right here!
apiRoute.use("/test", testRouter);

export default apiRoute;
