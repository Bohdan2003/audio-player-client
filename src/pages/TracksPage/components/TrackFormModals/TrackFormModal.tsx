import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { FormTextField } from "../../../../components/FormTextField.tsx";
import { GenreDropdown } from "../GenreDropdown.tsx";
//types
import { TTrackFields } from "../../../../utils/types/track.ts";

const schema = yup.object().shape({
  title: yup.string().required('Track title is required'),
  artist: yup.string().required('Artist name is required'),
  album: yup.string(),
  genres: yup.array().of(yup.string().required()),
  coverImage: yup.string().url('Must be a valid URL'),
});

type TTrackFormProps = {
  isModalOpen: boolean,
  onClose: () => void,
  isLoading: boolean,
  error: object,
  isError: boolean,
  isSuccess: boolean,
  resetMutation: () => void,
  onSubmit: (data: TTrackFields) => void,
  title: string,
  defaultValues?: TTrackFields
}

export const TrackFormModal: React.FC<TTrackFormProps> = ({
  isModalOpen,
  onClose,
  isLoading,
  error,
  isError,
  isSuccess,
  resetMutation,
  onSubmit,
  title,
  defaultValues,
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { title:'', artist: '', album:'', genres: [], coverImage:'' },
    reValidateMode: 'onBlur',
  });
  const { watch, setValue, reset } = methods;
  const genres = watch("genres") || [];

  const setNewGenre = (newGenre: string) => {
    if (newGenre && !genres.includes(newGenre)) {
      setValue('genres', [...genres, newGenre]);
    }
  };

  const handleRemoveGenre = (genreToRemove?: string) => {
    setValue(
      'genres',
      genres.filter((genre) => genre !== genreToRemove)
    );
  };

  return (
    <Dialog
      open={isModalOpen} onClose={() => {
      onClose();
      resetMutation();
    }}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle> { title } </DialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <form
            className="grid gap-[20px] py-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormTextField
              name="title"
              label="Track title"
            />
            <FormTextField
              name="artist"
              label="Artist name"
            />
            <FormTextField
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
              name="coverImage"
              label="Cover image"
            />
            <Button
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Send
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => reset(defaultValues)}
            >
              Clear
            </Button>
            {
              isSuccess &&
              <Alert severity="success">Success</Alert>
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
}