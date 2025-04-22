//hooks
import { useEffect, useState } from 'react'
import { useEditTrackMutation } from "../../../app/api.ts";
//components
import { GenreDropdown } from "./GenreDropdown.tsx";
import { Modal, Button, Chip, Typography, Alert } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { FormTextField } from "../../../components/FormTextField.tsx";
//utils
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
//types
import { TTrackFormValues } from "../../../utils/types/track.ts";

type TBaseModalFormProps = {
  id: string;
  isModalOpen: boolean,
  closeModal: () => void,
  defaultValues: TTrackFormValues
}

const schema = yup.object().shape({
  title: yup.string().required('Track title is required'),
  artist: yup.string().required('Artist name is required'),
  album: yup.string(),
  genres: yup.array().of(yup.string()),
  coverImage: yup
    .string()
    .url('Must be a valid URL')
    .nullable()
    .notRequired(),
})

export const EditForm: React.FC<TBaseModalFormProps> = ({ isModalOpen, closeModal, id, defaultValues }) => {
  const [ editTrack, { isLoading, error, isSuccess }] = useEditTrackMutation();
  const [ showSuccess, setShowSuccess] = useState(false);
  const [ showError, setShowError] = useState(false);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    reValidateMode: 'onBlur',
  });
  const { watch, setValue, reset } = methods;
  const genres = watch("genres") || [];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isSuccess) {
      methods.reset();
      setShowSuccess(true);
      timeoutId = setTimeout(() => setShowSuccess(false), 3000);
    }
    return () => {clearTimeout(timeoutId)};
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  }, [error]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const setNewGenre = (newGenre: string) => {
    if (newGenre && !genres.includes(newGenre)) {
      setValue('genres', [...genres, newGenre]);
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (genreToRemove?: string) => {
    setValue(
      'genres',
      genres.filter((genre) => genre !== genreToRemove)
    );
  };

  return (
    <Modal open={isModalOpen} onClose={() => closeModal()}>
      <FormProvider {...methods}>
        <form
          className="bg-black-15 absolute top-1/2 left-1/2 -translate-1/2 w-[760px] p-[20px] rounded-[8px] grid gap-[20px]"
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
          {showSuccess && (
            <Alert severity="success">Track edited successfully!</Alert>
          )}
          {showError && (
            // @ts-ignore
            <Alert severity="error">{error.data.error}</Alert>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};
