import {
  createBoard,
  getBoardsByUser,
  createColumn,
} from "../services/board.service.js";

export const createBoardController = async (req, res) => {
  try {
    const { title } = req.body;
    const ownerId = req.user.userId; // từ JWT middleware

    const board = await createBoard({ title, ownerId });

    res.json({
      success: true,
      board,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBoardsController = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const boards = await getBoardsByUser(ownerId);

    res.json({
      success: true,
      boards,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createColumnController = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;

    const column = await createColumn({ boardId, title });

    res.json({
      success: true,
      column,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
