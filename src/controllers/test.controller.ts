import { RequestHandler } from "express";
import * as TestService from "../services/test.service";
import { User, UserCredentials } from "../types/test";

export const getDataHandler: RequestHandler = (req, res, next) => {
    try {
        const data: User[] = TestService.getTestData();

        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const addDataHandler: RequestHandler = (req, res, next) => {
    try {
        const username: string = req.body.username;
        const name: string = req.body.name;

        if (!username || !name) {
            return res.status(400).json("Please provide a valid input data!");
        }

        TestService.addTestData({ username, name });

        res.status(201).json({ username, name });
    } catch (error) {
        next(error);
    }
};

export const updateDataHandler: RequestHandler = (req, res, next) => {
    try {
        const testId: number = +req.params.testId;
        const newData: UserCredentials = req.body;

        const testData: User | undefined = TestService.findTestData(testId);

        // If testData is undefined or something like that
        if (!testData) {
            return res.status(404).json("Not found! Cannot update!");
        }

        const result: User = TestService.updateTestData(testId, newData);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteDataHandler: RequestHandler = (req, res, next) => {
    try {
        const testId: number = +req.params.testId;

        const testData: User | undefined= TestService.findTestData(testId);

        // If testData is undefined or something like that
        if (!testData) {
            return res.status(404).json("Not found!");
        }

        const deletedId: number = TestService.deleteTestData(testId);
        res.json(`Deleted test id: ${deletedId}`);
    } catch (error) {
        next(error);
    }
};
