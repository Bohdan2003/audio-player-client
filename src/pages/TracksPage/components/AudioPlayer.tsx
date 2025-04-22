import { useAppSelector } from "../../../app/hooks";
import { useEffect, useRef } from "react";

export const AudioPlayer: React.FC = () => {
  const audioFile = useAppSelector((state) => state.audioPlayer.audioFile);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && audioFile) {
      audioRef.current.load();
      audioRef.current.play().catch((e) => {
        console.warn("Автовоспроизведение не удалось:", e);
      });
    }
  }, [audioFile]);

  if (!audioFile) return null;

  return (
    <audio
      ref={audioRef}
      className="mt-[200px] w-full fixed bottom-0 z-10"
      controls
    >
      <source src={`http://localhost:8000/api/files/${audioFile}`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};
