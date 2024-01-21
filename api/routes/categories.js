import express from "express";
import { getAll, getCurrentTournaments, getOne } from "../controllers/category.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:id/current-tournaments", getCurrentTournaments);

export default router;
