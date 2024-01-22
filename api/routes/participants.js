import express from "express";
import asyncHandler from "express-async-handler";
import { getAll, getOne } from "../controllers/participant.js";

const router = express.Router();

router.get("/", asyncHandler(getAll));
router.get("/:id", asyncHandler(getOne));

export default router;
