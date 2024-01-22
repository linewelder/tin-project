import express from "express";
import asyncHandler from "express-async-handler";
import { getAll, getBestParticipants, getCurrentTournaments, getOne, getTournamentHistory } from "../controllers/category.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/current-tournaments", asyncHandler(getCurrentTournaments));
router.get("/:id/tournament-history", asyncHandler(getTournamentHistory));
router.get("/:id/best-participants", asyncHandler(getBestParticipants));

export default router;
