import express from "express";
import asyncHandler from "express-async-handler";
import { addNew, getAll, getOne, update } from "../controllers/tournament.js";
import { getParticipants } from "../controllers/tournamentParticipant.js";
import { authorize } from "../middleware.js";

const router = express.Router();

router.get("/", asyncHandler(getAll));
router.get("/:id", asyncHandler(getOne));
router.post("/", authorize(), asyncHandler(addNew));
router.put("/:id", authorize(), asyncHandler(update));

router.get("/:id/participants", asyncHandler(getParticipants));

export default router;
