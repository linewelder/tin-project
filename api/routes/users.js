import express from "express";
import { getTournaments } from "../controllers/user.js";

const router = express.Router();

router.get("/:id/tournaments", getTournaments);

export default router;
