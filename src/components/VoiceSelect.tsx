import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import ReactPlayer from "react-player";
import { MEDIA_API_ENDPOINT } from "../config";
import usePlayer from "../hooks/usePlayer";
import { Voice } from "../types/graphql";
import CircularProgress from "./CircularProgress";

type VoiceSelectProps<TFieldValues extends FieldValues> = {
  items: Array<Voice>;
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
};

const VoiceSelect = <T extends FieldValues>({
  items,
  name,
  form,
}: VoiceSelectProps<T>): JSX.Element => {
  const { playerRef, playerConfig, playerInfo } = usePlayer();

  const [currentVoice, setCurrentVoice] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(0);

  useEffect(() => {
    if (shouldPlay) {
      playerConfig.play();
      setShouldPlay(false);
    }
  }, [currentPlaying]);

  const playSample = (index: number) => {
    if (index === currentVoice) {
      playerConfig.playPause();
    } else {
      setShouldPlay(true);
      setCurrentVoice(index);
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, value = "" } }) => (
          <div className="flex flex-col gap-2">
            {items.map((voice, index) => (
              <div
                key={voice.name}
                className={clsx(
                  { "shadow-focus": value === voice.id },
                  "flex rounded-lg hover:bg-gray-100",
                )}
              >
                <button
                  className="flex flex-1 px-3 py-4 gap-2 items-center cursor-pointer"
                  onClick={() => onChange(voice.id)}
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div
                      className="rounded-full w-7 h-7"
                      style={
                        voice.gradient
                          ? { backgroundImage: voice.gradient }
                          : { backgroundColor: "lightgray" }
                      }
                    ></div>
                    <p className="text-base font-semibold text-gray-700">
                      {voice.name}
                    </p>
                    <p className="leading-6 text-[.7rem] text-gray-500">
                      {voice.description}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => playSample(index)}
                  className="flex items-center justify-center px-3"
                >
                  <CircularProgress
                    pathLength={
                      currentPlaying === index ? playerInfo.progress.played : 0
                    }
                  >
                    <div className="p-2 [&>svg]:w-full text-gray-500">
                      {playerInfo.playing && index === currentVoice ? (
                        <PauseIcon />
                      ) : (
                        <PlayIcon />
                      )}
                    </div>
                  </CircularProgress>
                </button>
              </div>
            ))}
          </div>
        )}
      />

      <ReactPlayer
        ref={playerRef}
        url={`${MEDIA_API_ENDPOINT}/samples/${items[currentVoice].id}`}
        playing={playerInfo.playing}
        onReady={() => setCurrentPlaying(currentVoice)}
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
    </>
  );
};

export default VoiceSelect;
