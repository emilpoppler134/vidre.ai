import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion, useAnimate } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useViewportWidth from "../../hooks/useViewportWidth";
import {
  ConfigurationAlternatives,
  ConfigurationItem,
} from "../../types/graphql";
import sleep from "../../utils/sleep";
import { FormFields } from "../../views/ProjectCreate";
import AnimatedSelect from "../animations/AnimatedSelect";
import AnimatedTitle from "../animations/AnimatedTitle";
import { BorderAnimationButton } from "../Buttons";
import { LogoIcon } from "../Icons";
import TStack from "../TStack";

type ConfigurationStepProps = {
  form: UseFormReturn<FormFields>;
  loading: boolean;
  changeStep: (value: number | ((prev: number) => number)) => void;
  configurations: ConfigurationAlternatives | undefined;
};

type SelectObject = {
  config: Array<ConfigurationItem | null | undefined> | null | undefined;
  name: "topic" | "retention" | "hook" | "callToAction";
  title: string;
  description: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ConfigurationStep: FC<ConfigurationStepProps> = ({
  form,
  loading,
  changeStep,
  configurations,
}) => {
  const [scope, animate] = useAnimate();
  const [animationReady, setAnimationReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selected, setSelected] = useState(0);
  const { isSmallWidth } = useViewportWidth({ maxWidth: 768 });
  const [canView, setCanView] = useState(0);

  useEffect(() => {
    if (animationReady) {
      const enterAnimation = async () => {
        animate(
          "#title",
          { y: 0, fontSize: isSmallWidth ? "7vw" : "4vw" },
          { duration: 0.3, delay: 0.3, ease: "easeOut" },
        );

        await sleep(300);
        setShowContent(true);
      };
      enterAnimation();
    }
  }, [animationReady]);

  const selectObjects: SelectObject[] = [
    {
      config: configurations?.hooks,
      name: "hook",
      title: "Hook",
      description:
        "Start strong. How will you grab attention? Choose a hook or let our AI create one.",
    },
    {
      config: configurations?.retentions,
      name: "retention",
      title: "Retention",
      description:
        "This is the main part of your script. What emotion or atmosphere do you want to create?",
    },
    {
      config: configurations?.callToActions,
      name: "callToAction",
      title: "Call to Action",
      description:
        "End with impact. How will you prompt action? Pick an ending or let our AI suggest one.",
    },
  ];

  const handleGoBack = () => {
    form.reset();
    changeStep((prev) => prev - 1);
  };

  const handleStepClick = (target: number) => {
    if (target <= canView) {
      setSelected(target);
    }
  };

  return (
    <>
      {!loading ? null : (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <LogoIcon />
        </div>
      )}
      <TStack
        show={!loading}
        ref={scope}
        className="min-h-screen flex flex-col pt-10 pb-[10rem]"
      >
        <button
          className="flex items-center gap-1 pb-4 text-white/75"
          onClick={handleGoBack}
        >
          <div className="w-6">
            <ChevronLeftIcon strokeWidth={2} />
          </div>
          <p className="text-lg">Previous</p>
        </button>

        <div className="flex flex-col items-center gap-4 sm:gap-8 ">
          <motion.h1
            id="title"
            className="text-white font-figTree font-semibold"
            initial={{
              opacity: 0,
              y: 100,
              filter: "blur(12px)",
              fontSize: "10vw",
            }}
            animate={{
              opacity: 1,
              y: 130,
              filter: "blur(0px)",
              fontSize: "10vw",
            }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => setAnimationReady(true)}
          >
            Configuration
          </motion.h1>

          <div id="text-container" className="-mt-4 scale-90 sm:scale-100">
            {animationReady && (
              <AnimatedTitle
                words={[
                  { word: "Build" },
                  { word: "your" },
                  { word: "video" },
                  { word: "script" },
                  { word: "with" },
                  { word: "the" },
                  {
                    word: "HRC",
                    class:
                      "bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 inline-block text-transparent bg-clip-text",
                  },
                  { word: "framework." },
                ]}
                textClass="text-base sm:text-lgext-white font-semibold font-Figtree"
                cursorClass="h-8 bg-indigo-200"
              />
            )}
          </div>

          {showContent && (
            <motion.div
              className="flex-1 flex flex-col justify-end items-center w-full text-white"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {selectObjects.map((selectObject, index) => {
                const isSelected = index === selected && index <= canView;
                return (
                  <motion.div
                    key={selectObject.name}
                    className="w-full py-4 flex flex-col gap-4 justify-center relative shrink"
                    variants={itemVariants}
                    animate={
                      isSelected
                        ? { flexGrow: 1, height: "auto" }
                        : { flexGrow: 0, height: "fit-content" }
                    }
                  >
                    {index < 2 && (
                      <div className="border-b border-primary-300/50 absolute w-full h-full inset-0"></div>
                    )}
                    {!isSelected && (
                      <div className="relative">
                        <motion.h2
                          layoutId={`h2-${selectObject.name}`}
                          style={{ scale: 0.7, opacity: 0.5 }}
                          className="font-figTree text-3xl font-bold text-center cursor-pointer"
                          onClick={() => handleStepClick(index)}
                          transition={{ duration: 0.4 }}
                        >
                          <span className="flex items-center justify-center gap-4">
                            {selectObject.title}

                            {index < canView && (
                              <div className="w-7 h-7">
                                <CheckIcon strokeWidth={3} />
                              </div>
                            )}
                          </span>
                        </motion.h2>
                      </div>
                    )}
                    {isSelected && (
                      <div className="mx-auto py-4 flex max-sm:flex-col max-sm:items-center justify-center gap-4 w-full">
                        <div className="flex-1">
                          <motion.h2
                            layoutId={`h2-${selectObject.name}`}
                            style={{ scale: 1, opacity: 1 }}
                            className="font-figTree text-3xl font-bold text-center mb-4"
                            transition={{ duration: 0.4 }}
                          >
                            {selectObject.title}
                          </motion.h2>
                          <motion.p
                            initial={{
                              y: 40,
                              opacity: 0,
                              filter: "blur(12px)",
                            }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            transition={{
                              delay: 0.3,
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                            className="px-8 text-sm max-sm:text-center text-white/65"
                          >
                            {selectObject.description}
                          </motion.p>
                        </div>

                        <motion.div className="flex-1 my-auto max-sm:w-full max-w-[20rem] lg:max-w-none">
                          <AnimatedSelect
                            form={form}
                            name={selectObject.name}
                            options={selectObject.config}
                            selectionCallback={() => {
                              setSelected((prev) => prev + 1),
                                setCanView(index + 1);
                            }}
                          />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              {!form.formState.isValid ? null : (
                <motion.div
                  className="flex flex-1 items-center pt-8"
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  <BorderAnimationButton type="submit" className="text-white">
                    <div className="flex items-center gap-4 px-2.5 py-1.5">
                      <SparklesIcon className="w-7" />
                      <span className="font-semibold text-2xl">Generate</span>
                    </div>
                  </BorderAnimationButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </TStack>
    </>
  );
};

export default ConfigurationStep;
