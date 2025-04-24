import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormTextField } from "../../../../components/FormTextField.tsx";
import { FormGenresSelect} from "./FormGenresSelect.tsx";
//types
import { TTrackFields } from "../../../../utils/types/track.ts";
import React from "react";
//utils
import { isAPIErrorType } from "../../../../utils/types/APIErrorType.ts";

const schema = yup.object().shape({
  title: yup.string().required('Track title is required'),
  artist: yup.string().required('Artist name is required'),
  album: yup.string(),
  genres: yup
    .array()
    .of(yup.string().required("Genre can't be empty"))
    .min(1, 'At least one genre is required')
    .required('Genres are required'),
  coverImage: yup.string().url('Must be a valid URL'),
});

type TTrackFormProps = {
  isModalOpen: boolean,
  onClose: () => void,
  isLoading: boolean,
  error?: object,
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
    resolver: yupResolver(schema) as Resolver<TTrackFields>,
    defaultValues: defaultValues || { title:'', artist: '', album:'', genres: [], coverImage:'' },
    reValidateMode: 'onBlur',
  });
  console.log(error)

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
            data-testid="track-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormTextField
              name="title"
              label="Track title"
              inputTestId="input-title"
              helperTextTestId="error-title"
            />
            <FormTextField
              name="artist"
              label="Artist name"
              inputTestId="input-artist"
              helperTextTestId="error-artist"
            />
            <FormTextField
              name="album"
              label="Album name"
              inputTestId="input-album"
              helperTextTestId="error-album"
            />

            <FormGenresSelect/>

            <FormTextField
              name="coverImage"
              label="Cover image"
              inputTestId="input-cover-image"
              helperTextTestId="error-cover-image"
            />
            <Button
              variant="contained"
              type="submit"
              loading={isLoading}
              data-loading={isLoading}
              disabled={isLoading}
              aria-disabled={isLoading}
              data-testid="submit-button"
            >
              Send
            </Button>
            <Button
              color="secondary"
              type="button"
              variant="outlined"
              onClick={() => onClose()}
            >
              Close
            </Button>
            {
              isSuccess &&
              <Alert
                severity="success"
                data-testid="confirm-dialog"
              >Success</Alert>
            }
            {
              isError &&
              <Alert severity="error">{ isAPIErrorType(error) && error?.data?.error || 'Something went wrong!'}</Alert>
            }
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}