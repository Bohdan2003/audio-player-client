//hooks
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
//components
import WavesurferPlayer from "@wavesurfer/react";
import { Slider, IconButton, Typography, Alert } from "@mui/material";
import { PlayArrow, Pause, VolumeUp } from "@mui/icons-material";
//types
import type WaveSurfer from "wavesurfer.js";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const AudioPlayer = () => {
  const audioFile = useAppSelector((state) => state.audioPlayer.audioFile);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isError, setIsError] = useState(false);

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setDuration(ws.getDuration());
    ws.setVolume(volume);
    setIsPlaying(false);
    setIsError(false);
  };

  const onPlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const vol = typeof newValue === "number" ? newValue : newValue[0];
    setVolume(vol);
    wavesurfer?.setVolume(vol);
  };

  if (!audioFile) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black-15 px-4 py-1 shadow-lg z-50">
      <div className="container">
        {
          isError &&
          <Alert severity="error" className="mb-2">
            Playback error
          </Alert>
        }
        <WavesurferPlayer
          url={`http://localhost:8000/api/files/${audioFile}`}
          height={isError ? 1 : 75}
          waveColor="violet"
          progressColor="purple"
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsError(true)}
        />

        <div className="flex justify-between items-center mt-1">
          <IconButton
            disabled={isError}
            onClick={onPlayPause}
            color="primary"
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          <Typography variant="body2">Duration: {formatTime(duration)}</Typography>

          <div className="flex items-center gap-1 pr-2">
            <VolumeUp />
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.01}
              sx={{ width: 100 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
