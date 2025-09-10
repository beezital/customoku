import { BoardModel } from "@/models/models";
import { useCallback } from "react";


function createEmptyBoard() {
  return {
    grids: Array.from({ length: 9 }, (_, gridId) => ({
      gridId,
      cells: Array.from({ length: 9 }, (_, cellId) => ({
        cellId,
        value: undefined,
        isLocked: false,
        marks: Array(9).fill(false)
      }))
    })),
    name: "Game " + crypto.getRandomValues(new Uint32Array(1))[0],
    boardId: crypto.randomUUID(),
  }
}


export function useBoardModelHelper() {

  const loadBoardModel = useCallback((): BoardModel => {
    // load board model from local storage
    let initialBoardModel: BoardModel;
    const savedBoardModelJSON = localStorage.getItem("boardModel");
    if (savedBoardModelJSON) {
      initialBoardModel = JSON.parse(savedBoardModelJSON);
      // ensure boardId exists
      if (!initialBoardModel.boardId) {
        initialBoardModel.boardId = crypto.randomUUID();
      }
      if (!initialBoardModel.name) {
        initialBoardModel.name = "Game " + crypto.getRandomValues(new Uint32Array(1))[0];
      }
    } else {
      initialBoardModel = createEmptyBoard();
    }
    return initialBoardModel;
  }, []);


  const saveBoardModel = useCallback(async (boardModel: BoardModel) => {
    localStorage.setItem("boardModel", JSON.stringify(boardModel));
    // also save to allBoards
    const allBoardsJSON = localStorage.getItem("allBoards") || "{}";
    const allBoards: { [key: string]: BoardModel } = JSON.parse(allBoardsJSON);
    allBoards[boardModel.boardId] = boardModel;
    localStorage.setItem("allBoards", JSON.stringify(allBoards));
  }, []);


  const swapBoardModel = useCallback((targetBoardModelId: string) => {
    let currentBoardModel: BoardModel = JSON.parse(localStorage.getItem("boardModel") || "{}");

    const allBoardsJSON = localStorage.getItem("allBoards") || "{}";
    const allBoards: { [key: string]: BoardModel } = JSON.parse(allBoardsJSON);

    const targetBoardModel = allBoards[targetBoardModelId];
    if (targetBoardModel) {
      // save the target board model to local storage as the current board model
      localStorage.setItem("boardModel", JSON.stringify(targetBoardModel));
    } else {
      // create a new empty board if the target board model is not found
      const emptyBoardModel = createEmptyBoard();
      localStorage.setItem("boardModel", JSON.stringify(emptyBoardModel));
      currentBoardModel = emptyBoardModel;
    }
    // also save the current board model to allBoards
    allBoards[currentBoardModel.boardId] = currentBoardModel;
    localStorage.setItem("allBoards", JSON.stringify(allBoards));
  }, []);


  const getAllBoards = useCallback((): { [key: string]: BoardModel } => {
    const allBoardsJSON = localStorage.getItem("allBoards");
    if (allBoardsJSON) {
      return JSON.parse(allBoardsJSON);
    } else {
      return {};
    }
  }, []);


  const getSortedBoards = useCallback((): BoardModel[] => {
    const allBoards = getAllBoards();
    const boardsArray = Object.values(allBoards);
    boardsArray.sort((a, b) => a.name.localeCompare(b.name));
    return boardsArray;
  }, [getAllBoards]);


  const deleteBoard = useCallback((boardId: string) => {
    const allBoards = getAllBoards();
    if (allBoards[boardId]) {
      delete allBoards[boardId];
      localStorage.setItem("allBoards", JSON.stringify(allBoards));
    }
    const firstBoard = getSortedBoards()[0];
    if (firstBoard) {
      localStorage.setItem("boardModel", JSON.stringify(firstBoard));
    } else {
      const emptyBoardModel = createEmptyBoard();
      saveBoardModel(emptyBoardModel);
    }
  }, [getAllBoards, getSortedBoards, saveBoardModel]);


  return {
    loadBoardModel,
    saveBoardModel,
    swapBoardModel,
    getAllBoards,
    getSortedBoards,
    deleteBoard,
  };
}