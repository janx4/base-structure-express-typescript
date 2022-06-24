import express, { Router } from "express";
import * as testController from "../controllers/test.controller";

const router: Router = express.Router();
// CRUD examples

router.get("/", testController.getDataHandler);

router.post("/", testController.addDataHandler);

router.patch("/:testId", testController.updateDataHandler);

router.delete("/:testId", testController.deleteDataHandler);

export default router;
