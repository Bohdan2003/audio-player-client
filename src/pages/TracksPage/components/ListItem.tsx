//hooks
import { useState} from "react";
import { useDeleteTrackMutation, useUnloadTrackMutation } from "../../../app/api.ts";
import { useAppDispatch } from "../../../app/hooks.ts";
//utils
import { cn } from "../../../utils/cn.ts";
import { DateFormatter } from "../../../utils/DateFormatter.ts";
import { TTrack } from "../../../utils/types/track.ts";
//components
import { UploadForm } from "./UploadForm.tsx";
import { EditForm} from "./EditForm.tsx";
import { Button } from "@mui/material";
import { DeleteIcon } from "../../../components/icons/DeleteIcon.tsx";
import { EditIcon } from "../../../components/icons/EditIcon.tsx";
import { PlayIcon } from "../../../components/icons/PlayIcon.tsx";
//img
import defaultImage from "../../../assets/defaultImage.avif";
//actions
import { setAudioPlayerUrl } from "../../../slices/audioPlayerSlice.ts";

export const ListItem: React.FC<TTrack> = (props) => {
  const dispatch = useAppDispatch();
  const [ deleteTrack, { isLoading: isDeleteLoading } ] = useDeleteTrackMutation();
  const [ unloadTrack, { isLoading: isUnloadLoading, isError: isUnloadError } ] = useUnloadTrackMutation();
  const [ isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [ isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  return (<li
    className="bg-black-10 border-[1px] border-black-20 px-[24px] py-[14px] rounded-[4px] flex items-center gap-[20px]"
  >
    <div className="relative">
      <div className={cn(props?.audioFile && 'opacity-70')}>
        {
          props.coverImage
            ? <img className="size-[100px] object-cover" src={props.coverImage} alt={props.title}/>
            : <img className="size-[100px] object-cover" src={defaultImage} alt={props.title}/>
        }
      </div>
      {
        props?.audioFile &&
        <button
          className="absolute top-1/2 left-1/2 -translate-1/2"
          onClick={() => {
            dispatch(setAudioPlayerUrl(props.audioFile));
          }}
        >
          <PlayIcon className="size-[40px]"/>
        </button>
      }
    </div>
    <div className="flex-2">
      <p className="text-[18px]">{props.title}</p>
      <p className="text-grey-60">{props.artist}</p>
    </div>
    <p className="flex-1">{DateFormatter.getReadableDate(props.createdAt)}</p>
    <p className="flex-1">{props.genres.toString().replace(/,/g, ', ')}</p>
    <div className="flex gap-[12px] justify-end">
      <button
        className="cursor-pointer"
        onClick={() => { setIsEditModalOpen(true); }}
      ><EditIcon/></button>
      <EditForm
        defaultValues={props}
        id={props.id}
        isModalOpen={isEditModalOpen}
        closeModal={() => { setIsEditModalOpen(false) }}
      />
      <button
        disabled={isDeleteLoading}
        className="cursor-pointer"
        onClick={() => {
          deleteTrack(props.id);
        }}
      ><DeleteIcon/></button>
      {
        props?.audioFile
          ? <Button
              disabled={isUnloadError}
              loading={isUnloadLoading}
              onClick={() => { unloadTrack(props.id) }}
            >Unload</Button>
          : <Button
              onClick={() => { setIsUploadModalOpen(true); }}
            >Upload</Button>
      }
      <UploadForm
        id={props.id}
        isModalOpen={isUploadModalOpen}
        closeModal={() => { setIsUploadModalOpen(false) }}
      />
    </div>
  </li>)
}

