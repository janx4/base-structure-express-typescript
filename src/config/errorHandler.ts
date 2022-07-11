import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);

    // Default error handler
    return res.status(500).send({
        error: "An error has occurred. Please try again later.",
    });
};

export default errorHandler;
