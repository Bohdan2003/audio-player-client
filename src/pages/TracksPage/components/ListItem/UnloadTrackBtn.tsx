import { useState } from "react";
import { useUnloadTrackMutation } from "../../../../app/api.ts";
import { Button } from "@mui/material";
import React from "react";
import { ConfirmationDialog } from "../../../../components/ConfirmationDialog.tsx";

export const UnloadTrackBtn: React.FC<{id: string}> = ({id}) => {
  const [ unloadTrack, { isLoading, isError } ] = useUnloadTrackMutation();
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false)

  return (<>
    <Button
      loading={isLoading}
      data-loading={isLoading}
      disabled={isLoading}
      aria-disabled={isLoading}
      onClick={() => {
        setIsDialogOpen(true)
      }}
    >Unload</Button>

    <ConfirmationDialog
      title="Are you sure you want to unload this track?"
      isOpen={isDialogOpen}
      isLoading={isLoading}
      isError={isError}
      onClose={() => { setIsDialogOpen(false) }}
      onConfirm={() => { unloadTrack(id) }}
    />
  </>)
}