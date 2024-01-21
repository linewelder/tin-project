import express from "express";
import { getAll, getCurrentTournaments, getOne, getTournamentHistory } from "../controllers/category.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/current-tournaments", getCurrentTournaments);
router.get("/:id/tournament-history", getTournamentHistory);

export default router;
