import { useState } from "react";
import { CreateForm } from "./CreateForm.tsx";
import { Button } from "@mui/material";

export const CreateTrackBtn: React.FC = () => {
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (<div className="container mt-[20px]">
    <Button onClick={() => { setIsModalOpen(true) }} >Create track</Button>

    <CreateForm
      isModalOpen={isModalOpen}
      closeModal={() => { setIsModalOpen(false) }}
    />
  </div>);
}