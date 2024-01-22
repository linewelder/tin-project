import express from "express";
import asyncHandler from "express-async-handler";
import { getTournaments } from "../controllers/user.js";

const router = express.Router();

router.get("/:id/tournaments", asyncHandler(getTournaments));

export default router;
