import { useForm } from 'react-hook-form';

import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Track title is required'),
  artist: yup.string().required('Artist name is required'),
  album: yup.string(),
  genres: yup.array().of(yup.string().required()),
  coverImage: yup.string().url('Must be a valid URL'),
});

export const useTrackForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title:'', artist: '', album:'', genres: [], coverImage:'' },
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

  return {
    reset,
    methods,
    genres,
    setNewGenre,
    handleRemoveGenre
  }
}