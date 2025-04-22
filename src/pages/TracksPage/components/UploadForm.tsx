import { useEffect, useState, useRef } from 'react';
import { useUploadTrackMutation } from '../../../app/api';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal, Button, Alert, Typography } from '@mui/material';

type TFormValues = {
  audioFile: File;
};

type TUploadTrackFormProps = {
  id: string;
  isModalOpen: boolean;
  closeModal: () => void;
};

const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB
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

export const UploadForm: React.FC<TUploadTrackFormProps> = ({ id, isModalOpen, closeModal }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTrack, { isLoading, isSuccess, error }] = useUploadTrackMutation();
  const methods = useForm<TFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { audioFile: undefined },
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  }, [error]);

  const onSubmit = (data: TFormValues) => {
    const formData = new FormData();
    formData.append('file', data.audioFile);

    uploadTrack({id, file: formData});
  };

  return (
    <Modal open={isModalOpen} onClose={() => closeModal()}>
      <FormProvider {...methods}>
        <form
          className="bg-black-15 absolute top-1/2 left-1/2 -translate-1/2 w-[600px] p-[24px] rounded-[8px] grid gap-[20px]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Typography variant="h6">Upload New Track</Typography>

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

          {showSuccess && (
            <Alert severity="success">Файл успешно загружен!</Alert>
          )}
          {showError && (
            //@ts-ignore
            <Alert severity="error">{error?.data?.error || 'Upload failed'}</Alert>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};
