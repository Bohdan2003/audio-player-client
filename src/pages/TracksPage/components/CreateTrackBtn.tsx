import { useState } from "react";
import { CreateTrackForm } from "./CreateTrackForm.tsx";
import { Button } from "@mui/material";

export const CreateTrackBtn: React.FC = () => {
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (<div className="container mt-[20px]">
    <Button onClick={() => { setIsModalOpen(true) }} >Create track</Button>

    <CreateTrackForm
      isModalOpen={isModalOpen}
      closeModal={() => { setIsModalOpen(false) }}
    />
  </div>);
}