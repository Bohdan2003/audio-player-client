//hooks
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
//components
import { GenreDropdown } from "./GenreDropdown.tsx";
import { Modal, Button, Chip, Typography, Alert } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from "../../../components/FormTextField.tsx";
//utils
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useCreateTrackMutation } from "../../../app/api.ts";
//types
import { TTrackFormValues} from "../../../utils/types/track.ts";

type TBaseModalFormProps = {
  isModalOpen: boolean,
  closeModal: () => void,
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

export const CreateForm: React.FC<TBaseModalFormProps> = ({ isModalOpen, closeModal }) => {
  const [createTrack, { isLoading, error, isSuccess }] = useCreateTrackMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title:'', artist: '', album:'', genres: [], coverImage:'' },
    reValidateMode: 'onBlur',
  });
  const { watch, setValue, reset } = methods;
  const genres = watch("genres") || [];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isSuccess) {
      reset();
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

  const onSubmit = (data: TTrackFormValues) => {
    createTrack(data);
  };

  return (
    <Modal open={isModalOpen} onClose={() => closeModal()}>
      <FormProvider {...methods}>
        <form
          className="bg-black-15 absolute top-1/2 left-1/2 -translate-1/2 w-[760px] p-[20px] rounded-[8px] grid gap-[20px]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Typography variant="h6">Create track</Typography>
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
            showSuccess &&
            <Alert severity="success">Track successfully created!</Alert>
          }
          {
            showError &&
            // showError in 'data' &&
            // error.data in 'error' &&
            // @ts-ignore
            <Alert severity="error">{error.data.error}</Alert>
          }
        </form>
      </FormProvider>
    </Modal>
  );
};
