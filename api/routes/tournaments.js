import express from "express";
import { getAll, getOne, getParticipants } from "../controllers/tournament.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/participants", getParticipants);

export default router;
