import { BoardModel } from "@/models/models";
import { useCallback } from "react";

export function useBoardModelHelper() {

  const loadBoardModel = useCallback((): BoardModel => {
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
        name: "New Board",
        boardId: crypto.randomUUID(),
      }
    }

    // load board model from local storage
    let initialBoardModel: BoardModel;
    const savedBoardModelJSON = localStorage.getItem("boardModel");
    if (savedBoardModelJSON) {
      initialBoardModel = JSON.parse(savedBoardModelJSON);
    } else {
      initialBoardModel = createEmptyBoard();
    }
    return initialBoardModel;
  }, []);


  const saveBoardModel = useCallback((boardModel: BoardModel) => {
    localStorage.setItem("boardModel", JSON.stringify(boardModel));
  }, []);

  return {
    loadBoardModel,
    saveBoardModel
  };
}