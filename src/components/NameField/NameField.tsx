import { useBoardModelHelper } from '@/hooks/useBoardModelHelper';
import { BoardModel } from '@/models/models';
import { TextField } from '@mui/material';

export default function NameField({ boardModel, setBoardModel }: { boardModel: BoardModel, setBoardModel: (boardModel: BoardModel) => void }) {

  const { saveBoardModel } = useBoardModelHelper();

  function onUpdateName(newName: string) {
    if (boardModel === null) {
      return;
    }
    const newBoardModel = { ...boardModel, name: newName };
    setBoardModel(newBoardModel);
    // save the current board to local storage
    saveBoardModel(newBoardModel);
  }

  return (
    <TextField id="standard-basic" label="Name" variant="standard" value={boardModel.name} onChange={(event) => onUpdateName(event.target.value)} />
  )
}