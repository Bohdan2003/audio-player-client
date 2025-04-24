//hooks
import { useState, memo } from "react";
import { useAppDispatch } from "../../../../app/hooks.ts";
//utils
import { cn } from "../../../../utils/cn.ts";
import { DateFormatter } from "../../../../utils/DateFormatter.ts";
import { TTrack } from "../../../../utils/types/track.ts";
//components
import { UploadMediaModal } from "../UploadMediaModal.tsx";
import { EditTrackModal} from "../TrackFormModals/EditTrackModal.tsx";
import { Button } from "@mui/material";
import { EditIcon } from "../../../../components/icons/EditIcon.tsx";
import { PlayIcon } from "../../../../components/icons/PlayIcon.tsx";
import { DeleteTrackBtn } from "./DeleteTrackBtn.tsx";
import { UnloadTrackBtn } from "./UnloadTrackBtn.tsx";
//img
import defaultImage from "../../../../assets/defaultImage.avif";
//actions
import { setAudioPlayerUrl } from "../../../../slices/audioPlayerSlice.ts";

type TListItemProps = {track: TTrack}
const imgCls = 'size-[200px] lg:size-[100px] object-cover';

export const ListItem: React.FC<TListItemProps> = memo(({track}) => {
  const dispatch = useAppDispatch();
  const [ isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [ isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  return (<li
    className="bg-black-10 border-[1px] border-black-20 px-[24px] py-[14px] rounded-[4px] flex flex-col lg:flex-row items-center gap-[20px]"
    data-testid={`track-item-${track.id}`}
  >
    <div className="relative">
      <div className={cn(track?.audioFile && 'opacity-70')}>
        {
          track.coverImage
            ? <img className={imgCls} src={track.coverImage} alt={track.title}/>
            : <img className={imgCls} src={defaultImage} alt={track.title}/>
        }
      </div>
      {
        track?.audioFile &&
        <button
          className="absolute top-1/2 left-1/2 -translate-1/2"
          onClick={() => {
            dispatch(setAudioPlayerUrl(track.audioFile));
          }}
        >
          <PlayIcon className="size-[40px]"/>
        </button>
      }
    </div>
    <div className="flex-2">
      <p
        className="text-[18px]"
        data-testid={`track-item-${track.id}-title`}
      >{track.title}</p>
      <p
        className="text-grey-60"
        data-testid={`track-item-${track.id}-artist`}
      >{track.artist}</p>
    </div>
    <p className="flex-1">{DateFormatter.getReadableDate(track.createdAt)}</p>
    <p className="flex-1">{track.genres.toString().replace(/,/g, ', ')}</p>
    <div className="flex-1">
      <div className="flex gap-[12px] justify-end">

        <button
          className="cursor-pointer"
          data-testid={`edit-track-${track.id}`}
          onClick={() => { setIsEditModalOpen(true); }}
        ><EditIcon/></button>

        <EditTrackModal
          defaultValues={track}
          id={track.id}
          isModalOpen={isEditModalOpen}
          onClose={() => { setIsEditModalOpen(false) }}
        />

        <DeleteTrackBtn id={track.id}/>

        {
          track?.audioFile
            ? <UnloadTrackBtn id={track.id}/>
            : <Button
                data-testid={`upload-track-${track.id}`}
                onClick={() => { setIsUploadModalOpen(true); }}
              >Upload</Button>
        }

        <UploadMediaModal
          id={track.id}
          isModalOpen={isUploadModalOpen}
          onClose={() => { setIsUploadModalOpen(false) }}
        />

      </div>
    </div>
  </li>)
});

