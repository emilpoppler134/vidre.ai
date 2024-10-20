import clsx from "clsx";
import { motion, useAnimate, usePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useIsLandscape } from "../../hooks/useIsLandscape";
import { FormFields } from "../../views/ProjectCreate";
import AnimatedTitle from "../animations/AnimatedTitle";
import { BorderAnimationButton } from "../Buttons";
import { TextField } from "../TextFields";

type TopicStepProps = {
  form: UseFormReturn<FormFields>;
  changeStep: (index: number | ((prev: number) => number)) => void;
};

const TopicStep: React.FC<TopicStepProps> = ({ form, changeStep }) => {
  const [scope, animate] = useAnimate();
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [isPresent, safeToRemove] = usePresence();
  const isLandscape = useIsLandscape();

  useEffect(() => {
    if (isPresent) {
      if (titleAnimationComplete) {
        const enterAnimation = async () => {
          animate("#title", { y: "0vh" }, { duration: 0.3 });
          await animate(
            "#text-container",
            { y: "0vh" },
            { duration: 0.3, delay: 0.15 },
          );
          animate(
            "#input-container",
            { height: "auto", y: "0vh", opacity: 1, filter: "blur(0px)" },
            { duration: 0.5, ease: "easeInOut" },
          );
          await animate(
            "#next-button",
            { height: "auto", y: "0vh", opacity: 1, filter: "blur(0px)" },
            { delay: 0.2, duration: 0.5, ease: "easeInOut" },
          );
        };
        enterAnimation();
      }
    } else {
      safeToRemove();
    }
  }, [titleAnimationComplete, isPresent]);

  const handleSubmit = () => {
    if (form.getValues("topic").trim() === "") {
      return form.setError("topic", { message: "This field is required." });
    }
    changeStep((prev) => prev + 1);
  };

  return (
    <div
      ref={scope}
      className={clsx(
        { "max-lg:pt-0 max-lg:pb-40": !isLandscape },
        "relative w-full h-full flex flex-col gap-8 max-lg:justify-center pt-24 lg:pt-16 pb-10 items-center",
      )}
    >
      <motion.h1
        id="title"
        className="text-white text-8xl sm:text-9xl lg:text-[10rem] font-figTree font-semibold"
        initial={{ opacity: 0, y: "10vh", filter: "blur(12px)" }}
        animate={{ opacity: 1, y: "13vh", filter: "blur(0px)" }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Topic
      </motion.h1>

      <motion.div id="text-container" initial={{ y: "13vh" }}>
        <AnimatedTitle
          words={[
            { word: "What" },
            { word: "do" },
            { word: "you" },
            { word: "want" },
            { word: "your" },
            {
              word: "script",
              class:
                "bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 inline-block text-transparent bg-clip-text",
            },
            { word: "to" },
            { word: "be" },
            { word: "about?" },
          ]}
          textClass="text-base sm:text-lg text-white font-semibold font-Figtree"
          cursorClass="h-8 bg-primary-200"
          callback={() => setTitleAnimationComplete(true)}
        />
      </motion.div>
      <motion.div id="form-container" className="relative w-fit" layout>
        <motion.div
          id="input-container"
          className="max-sm:max-w-80 sm:w-[24rem]"
          layout
          initial={{ height: 0, y: "5vh", filter: "blur(12px)", opacity: 0 }}
        >
          <TextField
            key="topic"
            form={form}
            name="topic"
            placeholder="Choose your topic?"
            className="!shadow-none font-semibold text-gray-700 !h-12 rounded-xl [&_input]:rounded-xl [&_input]:!px-4 [&_input]:text-lg"
          />
        </motion.div>

        <motion.div
          className="w-fit mx-auto mt-10"
          id="next-button"
          initial={{ height: 0, y: "5vh", filter: "blur(12px)", opacity: 0 }}
        >
          <BorderAnimationButton onPress={handleSubmit}>
            <div className="flex items-center px-10">
              <span className="font-bold text-gray-100 text-2xl">Next</span>
            </div>
          </BorderAnimationButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TopicStep;
