import {
  ArrowDownTrayIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { MEDIA_API_ENDPOINT } from "../config";
import { PlayerConfig, PlayerInfo } from "../hooks/usePlayer";
import { Speech } from "../types/graphql";
import { formatToMinutesAndSeconds } from "../utils/format-timestamp";

type AudioPlayerProps = {
  speech: Speech | undefined;
  playerConfig: PlayerConfig;
  playerInfo: PlayerInfo;
  playerRef: React.RefObject<ReactPlayer>;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  speech,
  playerConfig,
  playerInfo,
  playerRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      playerConfig.handleSeekStart();
      handleSeek(e);
    },
    [playerConfig.handleSeekStart],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleSeek(e as unknown as React.MouseEvent);
      }
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    playerConfig.handleSeekEnd();
  }, [isDragging]);

  const handleSeek = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.min(Math.max(offsetX / rect.width, 0), 1);

    playerConfig.handleSeek(newProgress);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const download = () => {
    window.open(`${MEDIA_API_ENDPOINT}/speeches/${speech?.id}?download`);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => playerConfig.playPause()}
          className="w-12 h-12 p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
        >
          {playerInfo.playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="relative flex-1 h-2 flex items-center">
          <div className="flex w-full h-full rounded pointer-events-none overflow-hidden *:block *:h-full">
            <span
              className="bg-primary-400"
              style={{
                width: `${playerInfo.progress.played * 100}%`,
              }}
            ></span>
            <span className="flex-1 bg-gray-200"></span>
          </div>
          <span
            className="absolute h-4 w-1 top-1/2 -translate-y-1/2 -translate-x-2/4 rounded-md bg-primary-400"
            style={{
              left: `${playerInfo.progress.played * 100}%`,
            }}
          ></span>
          <span
            className="w-full h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            aria-hidden="true"
            onMouseDown={handleMouseDown}
            ref={containerRef}
          />
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            {formatToMinutesAndSeconds(playerInfo.progress.playedSeconds)}
          </span>
          <span className="select-none pointer-events-none">/</span>
          <span>
            {formatToMinutesAndSeconds(Math.floor(playerInfo.duration))}
          </span>
        </div>
        <button
          onClick={download}
          className="w-10 h-10 p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowDownTrayIcon />
        </button>
      </div>

      {speech === undefined ? null : (
        <ReactPlayer
          ref={playerRef}
          url={`${MEDIA_API_ENDPOINT}/speeches/${speech.id}`}
          playing={playerInfo.playing}
          onDuration={(duration) => playerConfig.handleDuration(duration)}
          onProgress={playerConfig.handleProgress}
          onEnded={playerConfig.handleEnded}
          progressInterval={50}
          width={0}
          height={0}
          config={{
            file: {
              attributes: {
                preload: "auto",
              },
              forceAudio: true,
            },
          }}
        />
      )}
    </>
  );
};

export default AudioPlayer;
