import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import ReactPlayer from "react-player";
import { MEDIA_API_ENDPOINT } from "../../config";
import usePlayer from "../../hooks/usePlayer";
import { Voice } from "../../types/graphql";
import CircularProgress from "../CircularProgress";

type VoiceSelectProps<TFieldValues extends FieldValues> = {
  open: boolean;
  onClose: () => void;
  voices: Array<Voice> | undefined;
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
};

const VoiceSelect = <T extends FieldValues>({
  open,
  onClose,
  voices,
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
          <Dialog className="relative z-50" open={open} onClose={onClose}>
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform w-full py-6 rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 md:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="flex flex-col gap-2">
                    {voices === undefined
                      ? null
                      : voices.map((voice, index) => (
                          <div
                            key={voice.name}
                            className="flex h-20 sm:h-auto rounded-lg hover:bg-gray-100"
                          >
                            <button
                              className="flex-1 flex items-center gap-2 pl-3 sm:pl-4 sm:py-4"
                              onClick={() => {
                                onChange(voice.id);
                                playerConfig.pause();
                                onClose();
                              }}
                            >
                              <div className="flex flex-1 items-center gap-4 text-left">
                                <span
                                  className="flex flex-shrink-0 w-7 h-7 rounded-full"
                                  style={
                                    voice.gradient
                                      ? { backgroundImage: voice.gradient }
                                      : { backgroundColor: "lightgray" }
                                  }
                                ></span>
                                <div className="flex items-center">
                                  <p className="min-w-16 text-sm sm:text-base font-semibold text-gray-700">
                                    {voice.name}
                                  </p>
                                  <p className="text-xs sm:text-[.7rem] leading-5 sm:leading-6 text-gray-500">
                                    {voice.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                            <button
                              onClick={() => playSample(index)}
                              className="flex items-center justify-center px-3"
                            >
                              <CircularProgress
                                pathLength={
                                  currentPlaying === index
                                    ? playerInfo.progress.played
                                    : 0
                                }
                              >
                                <div className="p-2 [&>svg]:w-full text-gray-500">
                                  {playerInfo.playing &&
                                  index === currentVoice ? (
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
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      />

      <ReactPlayer
        ref={playerRef}
        url={`${MEDIA_API_ENDPOINT}/samples/${voices === undefined ? "" : voices[currentVoice].id}`}
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
