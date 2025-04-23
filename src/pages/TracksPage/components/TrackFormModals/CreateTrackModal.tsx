//hooks
import { useCreateTrackMutation } from "../../../../app/api.ts";
//components
import { TrackFormModal } from "./TrackFormModal.tsx";

type TCreateFormProps = {
  isModalOpen: boolean,
  onClose: () => void,
}

export const CreateTrackModal: React.FC<TCreateFormProps> = ({ isModalOpen, onClose }) => {
  const [createTrack, {
    isLoading,
    error,
    isError,
    isSuccess,
    reset
  }] = useCreateTrackMutation();

  return (
    <TrackFormModal
      title="Create Track"
      isLoading={isLoading}
      error={error}
      resetMutation={reset}
      isError={isError}
      isSuccess={isSuccess}
      isModalOpen={isModalOpen}
      onClose={onClose}
      onSubmit={(data) => {
        createTrack(data)
      }}
    />
  )
};
