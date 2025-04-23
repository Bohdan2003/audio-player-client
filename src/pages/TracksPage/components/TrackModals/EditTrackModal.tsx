//hooks
import { useEffect } from 'react'
import { useTrackForm } from './useTrackForm.ts';
import { useEditTrackMutation } from "../../../../app/api.ts";
//components
import { GenreDropdown } from "../GenreDropdown.tsx";
import {
  Button,
  Chip,
  Typography,
  Alert,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from "../../../../components/FormTextField.tsx";
//types
import { TTrackFields } from '../../../../utils/types/track.ts';

type TBaseModalFormProps = {
  id: string;
  isModalOpen: boolean,
  onClose: () => void,
  defaultValues: TTrackFields
}

export const EditTrackModal: React.FC<TBaseModalFormProps> = ({ isModalOpen, onClose, id, defaultValues }) => {
  const [ editTrack, {
    isLoading,
    isError,
    error,
    isSuccess,
    reset: resetMutation
  }] = useEditTrackMutation();
  const { methods, genres, setNewGenre, handleRemoveGenre, reset } = useTrackForm();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        onClose();
        resetMutation();
      }}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle> Edit track </DialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <form
            className="grid gap-[20px] py-2"
            onSubmit={methods.handleSubmit((track) => {
              editTrack({id, track});
            })}
          >
            <Typography variant="h6">Edit track</Typography>
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
              Edit
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => reset()}
            >
              Reset
            </Button>
            {
              isSuccess &&
              <Alert severity="success">Track successfully edited!</Alert>
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
