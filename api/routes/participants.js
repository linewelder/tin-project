import express from "express";
import asyncHandler from "express-async-handler";
import { getAll, getOne, addNew, deleteOne, update } from "../controllers/participant.js";
import { authorize } from "../middleware.js";

const router = express.Router();

router.get("/", asyncHandler(getAll));
router.get("/:id", asyncHandler(getOne));
router.post("/", authorize({ admin: true }), asyncHandler(addNew));
router.delete("/:id", authorize({ admin: true }), asyncHandler(deleteOne));
router.put("/:id", authorize({ admin: true }), asyncHandler(update));

export default router;
