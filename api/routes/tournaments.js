import express from "express";
import { addNew, getAll, getOne, getParticipants } from "../controllers/tournament.js";
import { authorize } from "../middleware.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/participants", getParticipants);
router.post("/", authorize(), addNew);

export default router;
