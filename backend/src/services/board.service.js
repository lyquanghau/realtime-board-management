import { db } from "../config/firebase.js";

export const createBoard = async ({ title, ownerId }) => {
  if (!title) {
    throw new Error("Title is required");
  }

  const boardRef = await db.collection("boards").add({
    title,
    ownerId,
    createdAt: new Date(),
  });

  return {
    id: boardRef.id,
    title,
  };
};

export const getBoardsByUser = async (ownerId) => {
  const snapshot = await db
    .collection("boards")
    .where("ownerId", "==", ownerId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createColumn = async ({ boardId, title }) => {
  if (!title) {
    throw new Error("Column title is required");
  }

  const columnRef = await db
    .collection("boards")
    .doc(boardId)
    .collection("columns")
    .add({
      title,
      order: Date.now(), // tạm dùng để sort
      createdAt: new Date(),
    });

  return {
    id: columnRef.id,
    title,
  };
};

export const getColumns = async (boardId) => {
  const snapshot = await db
    .collection("boards")
    .doc(boardId)
    .collection("columns")
    .orderBy("createdAt")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
