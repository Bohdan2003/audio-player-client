import { useState } from "react";
import { CreateTrackModal } from "./TrackModals/CreateTrackModal.tsx";
import { Button } from "@mui/material";

export const CreateTrackBtn: React.FC = () => {
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (<div className="container mt-[20px]">
    <Button
      data-testid="create-track-button"
      onClick={() => { setIsModalOpen(true) }}
    >Create track</Button>

    <CreateTrackModal
      isModalOpen={isModalOpen}
      onClose={() => { setIsModalOpen(false) }}
    />
  </div>);
}