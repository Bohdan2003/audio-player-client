import { Filters } from "./components/FIlters.tsx";
import { List } from "./components/List.tsx";
import { CreateTrackBtn } from "./components/CreateTrackBtn.tsx";

export const TracksPage: React.FC = () => {
  return (<div className="pb-[80px]">
    <audio
      className="mt-[200px] w-full fixed bottom-0 z-10"
      controls
    >
      <source src="http://localhost:8000/api/files/test.mp3" type="audio/mpeg"/>
      Your browser does not support the audio element.
    </audio>
    <CreateTrackBtn/>
    <Filters/>
    <List/>
  </div>)
}