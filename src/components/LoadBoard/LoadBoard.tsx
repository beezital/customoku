import { useState } from "react";
import { useBoardModelHelper } from "@/hooks/useBoardModelHelper";
import { BoardModel } from "@/models/models";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { RemoveCircle } from '@mui/icons-material';

function LoadBoardDialog({ currentBoardId, isDialogOpen, setIsDialogOpen }: { currentBoardId: string, isDialogOpen: boolean, setIsDialogOpen: (open: boolean) => void }) {

  const { getSortedBoards, swapBoardModel, deleteBoard } = useBoardModelHelper();
  const [boardIdMarkedForDeletion, setBoardIdMarkedForDeletion] = useState<string | null>(null);

  const boardList = getSortedBoards();

  function handleClose() {
    setIsDialogOpen(false);
  }

  function handleNewBoard() {
    // clear the local storage
    swapBoardModel("new");
    // reload the page
    window.location.reload();
  }

  function handleSelectBoard(boardId: string) {
    if (boardIdMarkedForDeletion !== null) {
      setBoardIdMarkedForDeletion(null);
      return;
    }
    swapBoardModel(boardId);
    // reload the page
    window.location.reload();
  }

  function markForDeletion(boardId: string) {
    if (boardIdMarkedForDeletion === boardId) {
      setBoardIdMarkedForDeletion(null);
      return;
    }
    setBoardIdMarkedForDeletion(boardId);
  }

  function handleDelete() {
    if (boardIdMarkedForDeletion === null) {
      return;
    }
    deleteBoard(boardIdMarkedForDeletion);
    setBoardIdMarkedForDeletion(null);
    // reload the page
    window.location.reload();
  }

  return (
    <Dialog onClose={handleClose} open={isDialogOpen}>
      <DialogTitle>Load Another Board</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a board to load.
        </DialogContentText>
        {boardList.length === 0 && <DialogContentText>No boards found. Please create a new board.</DialogContentText>}
        <List>
          {boardList.map((board: BoardModel) => (
            <ListItem disablePadding key={board.boardId}>
              <ListItemButton onClick={() => { handleSelectBoard(board.boardId); }} divider={true}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  {board.name}
                  {board.boardId === currentBoardId && (
                    <IconButton aria-label="delete" onClick={(event) => { event.stopPropagation(); markForDeletion(board.boardId); }}>
                      <RemoveCircle style={{ color: boardIdMarkedForDeletion === board.boardId ? "red" : "inherit" }} />
                    </IconButton>
                  )}
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="warning" disabled={boardIdMarkedForDeletion === null}>
          Delete
        </Button>
        <Button onClick={handleNewBoard} color="secondary">
          New
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function LoadBoard({ currentBoardId }: { currentBoardId: string }) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onOpenDialog() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={onOpenDialog}>Load Another Board</Button>
      <LoadBoardDialog currentBoardId={currentBoardId} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  )
}