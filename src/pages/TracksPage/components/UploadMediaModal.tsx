import { useRef } from 'react'
import { useUploadTrackMutation } from '../../../app/api';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Alert,
  Typography,
  DialogContent,
  DialogTitle,
  Dialog
} from '@mui/material';

type TFormValues = {
  audioFile: File;
};

type TUploadTrackFormProps = {
  id: string;
  isModalOpen: boolean;
  onClose: () => void;
};

const FILE_SIZE_LIMIT = 15 * 1024 * 1024; // 15MB
const SUPPORTED_FORMATS = ['audio/mpeg', 'audio/wav'];

const schema = yup.object().shape({
  audioFile: yup
    .mixed<File>()
    .required('Audio file is required')
    .test('fileSize', 'File is too large', (file: File | undefined) =>
      file ? file.size <= FILE_SIZE_LIMIT : false
    )
    .test('fileType', 'Unsupported file format', (file: File | undefined) =>
      file ? SUPPORTED_FORMATS.includes(file.type) : false
    ),
});

export const UploadMediaModal: React.FC<TUploadTrackFormProps> = ({ id, isModalOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTrack, {
    isLoading,
    isSuccess,
    isError,
    error,
    reset: resetMutation
  }] = useUploadTrackMutation();
  const methods = useForm<TFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { audioFile: undefined },
  });

  const onSubmit = (data: TFormValues) => {
    const formData = new FormData();
    formData.append('file', data.audioFile);

    uploadTrack({id, file: formData});
  };

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
      <DialogTitle>Upload New Track</DialogTitle>

      <DialogContent>
        <FormProvider {...methods}>
          <form
            className="grid gap-[20px] py-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Controller
              name="audioFile"
              control={methods.control}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp3, .wav"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="body2">
                      {fieldState.error.message}
                    </Typography>
                  )}
                </div>
              )}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              Upload
            </Button>

            <Button variant="outlined" onClick={() => {
              methods.reset();
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}>
              Clear
            </Button>

            {
              isSuccess &&
              <Alert severity="success">Файл успешно загружен!</Alert>
            }
            {
              isError &&
              //@ts-ignore
              <Alert severity="error">{error?.data?.error || 'Upload failed'}</Alert>
            }
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
