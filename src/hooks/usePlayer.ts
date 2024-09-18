import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

type ProgressState = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

export type PlayerInfo = {
  duration: number;
  progress: ProgressState;
  playing: boolean;
};

export type PlayerConfig = {
  playPause: () => void;
  pause: () => void;
  play: () => void;
  handleSeek: (newProgress: number) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
  handleProgress: (state: ProgressState) => void;
  handleDuration: (duration: number) => void;
  handleEnded: () => void;
};

type UsePlayerReturn = {
  playerRef: React.RefObject<ReactPlayer>;
  playerInfo: PlayerInfo;
  playerConfig: PlayerConfig;
};

const usePlayer = (): UsePlayerReturn => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    duration: 0,
    progress: { loaded: 0, loadedSeconds: 0, played: 0, playedSeconds: 0 },
    playing: false,
  });

  const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false);

  const handleSeekStart = () => {
    setWasPlayingBeforeSeek(playerInfo.playing);
    setPlayerInfo((prev) => ({ ...prev, playing: false }));
  };

  const handleSeekEnd = () => {
    setPlayerInfo((prev) => ({ ...prev, playing: wasPlayingBeforeSeek }));
  };

  const handleSeek = (newProgress: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newProgress * playerInfo.duration, "seconds");
    }
  };

  const playPause = () =>
    setPlayerInfo((prev) => ({ ...prev, playing: !prev.playing }));

  const pause = () => setPlayerInfo((prev) => ({ ...prev, playing: false }));

  const play = () => setPlayerInfo((prev) => ({ ...prev, playing: true }));

  const handleProgress = (state: ProgressState) =>
    setPlayerInfo((prev) => ({ ...prev, progress: state }));

  const handleDuration = (duration: number) =>
    setPlayerInfo((prev) => ({ ...prev, duration: duration }));

  const handleEnded = () => {
    setPlayerInfo((prev) => ({ ...prev, playing: false }));
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
    const audio = document.querySelector("audio");
    if (audio) {
      audio.load();
    }
  };

  const playerConfig = {
    playPause,
    pause,
    play,
    handleSeek,
    handleSeekStart,
    handleSeekEnd,
    handleProgress,
    handleDuration,
    handleEnded,
  };
  return {
    playerRef,
    playerConfig,
    playerInfo,
  };
};

export default usePlayer;
