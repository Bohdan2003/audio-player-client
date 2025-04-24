import { useState } from "react";
import { DeleteIcon } from "../../../../components/icons/DeleteIcon.tsx";
import { useDeleteTrackMutation } from "../../../../app/api.ts";
import React from "react";
import {ConfirmationDialog} from "../../../../components/ConfirmationDialog.tsx";

export const DeleteTrackBtn: React.FC<{id: string}> = ({id}) => {
  const [ deleteTrack, { isLoading, isError } ] = useDeleteTrackMutation();
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false)

  return (<>
    <button
      className="cursor-pointer"
      data-testid={`delete-track-${id}`}
      disabled={isLoading}
      onClick={() => {
        setIsDialogOpen(true)
      }}
    ><DeleteIcon/></button>

    <ConfirmationDialog
      title="Are you sure you want to delete this track?"
      isOpen={isDialogOpen}
      isLoading={isLoading}
      isError={isError}
      onClose={() => { setIsDialogOpen(false) }}
      onConfirm={() => { deleteTrack(id) }}
    />
  </>)
}