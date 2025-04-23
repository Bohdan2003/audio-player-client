//hooks
import { useTrackForm } from './useTrackForm.ts';
import { useCreateTrackMutation } from "../../../../app/api.ts";
//components
import { GenreDropdown } from "../GenreDropdown.tsx";
import {
  Alert,
  Button,
  Chip,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog
} from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from "../../../../components/FormTextField.tsx";

type TBaseModalFormProps = {
  isModalOpen: boolean,
  onClose: () => void,
}

export const CreateTrackModal: React.FC<TBaseModalFormProps> = ({ isModalOpen, onClose }) => {
  const [createTrack, {
    isLoading,
    error,
    isError,
    isSuccess,
    reset: resetMutation
  }] = useCreateTrackMutation();
  const { methods, genres, setNewGenre, handleRemoveGenre, reset } = useTrackForm();

  return (
    <Dialog
      open={isModalOpen} onClose={() => {
        onClose();
        resetMutation();
      }}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle> Create track </DialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <form
            className="grid gap-[20px] py-2"
            onSubmit={methods.handleSubmit((data) => {
              createTrack(data)
            })}
          >
            <FormTextField
              fullWidth
              name="title"
              label="Track title"
            />
            <FormTextField
              fullWidth
              name="artist"
              label="Artist name"
            />
            <FormTextField
              fullWidth
              name="album"
              label="Album name"
            />

            {/* Genre input */}
            <div>
              <Typography variant="subtitle1">Genres</Typography>
              <div className="flex gap-[8px] flex-wrap mb-[12px]">
                {genres.map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    onDelete={() => handleRemoveGenre(genre)}
                  />
                ))}
              </div>
              <GenreDropdown setGenre={setNewGenre}/>
            </div>

            <FormTextField
              fullWidth
              name="coverImage"
              label="Cover image"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Create
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => reset()}
            >
              Clear
            </Button>
            {
              isSuccess &&
              <Alert severity="success">Track successfully created!</Alert>
            }
            {
              isError &&
              //@ts-ignore
              <Alert severity="error">{error?.data?.error || 'Error'}</Alert>
            }
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
