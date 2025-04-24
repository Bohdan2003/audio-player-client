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
          data-testid="confirm-delete"
          fullWidth
          variant="outlined"
          onClick={onConfirm}
          loading={isLoading}
          data-loading={isLoading}
          disabled={isLoading}
          aria-disabled={isLoading}
        >Confirm</Button>
        <Button
          data-testid="confirm-delete"
          fullWidth
          variant="contained"
          onClick={onClose}
        >Close</Button>
      </div>
      {
        isError &&
        <div data-testid="toast-container">
          <Alert data-testid="toast-error" className="mt-2" severity="error">Something went wrong!</Alert>
        </div>
      }
    </DialogContent>
  </Dialog>)
}