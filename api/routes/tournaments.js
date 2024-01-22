import express from "express";
import asyncHandler from "express-async-handler";
import { addNew, getAll, getOne, getParticipants, update } from "../controllers/tournament.js";
import { authorize } from "../middleware.js";

const router = express.Router();

router.get("/", asyncHandler(getAll));
router.get("/:id", asyncHandler(getOne));
router.get("/:id/participants", asyncHandler(getParticipants));
router.post("/", authorize(), asyncHandler(addNew));
router.put("/:id", authorize(), asyncHandler(update));

export default router;
