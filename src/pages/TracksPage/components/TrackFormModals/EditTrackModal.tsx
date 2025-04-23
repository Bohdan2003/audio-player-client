//hooks
import { useEditTrackMutation } from "../../../../app/api.ts";
//components
import { TrackFormModal } from "./TrackFormModal.tsx";
//types
import { TTrackFields } from '../../../../utils/types/track.ts';

type TEditFormProps = {
  id: string;
  isModalOpen: boolean,
  onClose: () => void,
  defaultValues: TTrackFields
}

export const EditTrackModal: React.FC<TEditFormProps> = ({
  isModalOpen,
  onClose,
  id,
  defaultValues
}) => {
  const [ editTrack, {
    isLoading,
    isError,
    error,
    isSuccess,
    reset
  }] = useEditTrackMutation();

  return (
    <TrackFormModal
      title="Edit Track"
      defaultValues={defaultValues}
      isLoading={isLoading}
      error={error}
      resetMutation={reset}
      isError={isError}
      isSuccess={isSuccess}
      isModalOpen={isModalOpen}
      onClose={onClose}
      onSubmit={(data) => {
        editTrack({id, track: data});
      }}
    />
  );
};
