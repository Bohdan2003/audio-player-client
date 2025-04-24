import {Alert, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";

type TConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  isError: boolean;
  title: string;
}

export const ConfirmationDialog: React.FC<TConfirmationDialogProps> = ({
   isOpen,
   onClose,
   onConfirm,
   isLoading,
   isError,
   title,
}) => {
  return (<Dialog
    data-testid="confirm-dialog"
    open={isOpen}
    onClose={onClose}
    maxWidth='sm'
    fullWidth
  >
    <DialogTitle> {title} </DialogTitle>
    <DialogContent>
      <div className="flex gap-2">
        <Button
          fullWidth
          variant="outlined"
          onClick={onConfirm}
          disabled={isLoading}
        >Unload</Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
        >Close</Button>
      </div>
      {
        isError &&
        <Alert className="mt-2" severity="error">Unload failed</Alert>
      }
    </DialogContent>
  </Dialog>)
}