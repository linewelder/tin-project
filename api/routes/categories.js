import express from "express";
import asyncHandler from "express-async-handler";
import {
    addNew,
    deleteOne,
    getAll,
    getBestParticipants,
    getCurrentTournaments,
    getOne,
    getTournamentHistory,
    update
} from "../controllers/category.js";
import { authorize } from "../middleware.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/current-tournaments", asyncHandler(getCurrentTournaments));
router.get("/:id/tournament-history", asyncHandler(getTournamentHistory));
router.get("/:id/best-participants", asyncHandler(getBestParticipants));
router.post("/", authorize({ admin: true }), addNew);
router.delete("/:id", authorize({ admin: true }), deleteOne);
router.put("/:id", authorize({ admin: true }), update);

export default router;
