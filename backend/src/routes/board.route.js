import express from "express";
import { createBoardController } from "../controllers/board.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getMyBoardsController } from "../controllers/board.controller.js";
import { createColumnController } from "../controllers/board.controller.js";

const router = express.Router();

router.post("/", verifyJWT, createBoardController);
router.get("/", verifyJWT, getMyBoardsController);
router.post("/:boardId/columns", verifyJWT, createColumnController);

export default router;
