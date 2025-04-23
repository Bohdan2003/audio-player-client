import { Filters } from "./components/FIlters.tsx";
import { List } from "./components/List.tsx";
import { CreateTrackBtn } from "./components/CreateTrackBtn.tsx";
import { AudioPlayer } from "./components/AudioPlayer.tsx";

export const TracksPage: React.FC = () => {
  return (<div className="mb-[150px]">
    <CreateTrackBtn/>
    <Filters/>
    <List/>
    <AudioPlayer/>
  </div>)
}