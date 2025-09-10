import { useBoardModelHelper } from "@/hooks/useBoardModelHelper";
import { BoardModel } from "@/models/models";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton } from "@mui/material";
import { useState } from "react";

function LoadBoardDialog({ isDialogOpen, setIsDialogOpen }: { isDialogOpen: boolean, setIsDialogOpen: (open: boolean) => void }) {

  const { getSortedBoards, swapBoardModel } = useBoardModelHelper();

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
              <ListItemButton onClick={() => { swapBoardModel(board.boardId); }} divider={true}>
                {board.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNewBoard} color="warning">
          New empty board
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function LoadBoard() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onOpenDialog() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={onOpenDialog}>Load Another Board</Button>
      <LoadBoardDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  )
}