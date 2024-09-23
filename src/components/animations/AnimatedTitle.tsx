import { motion } from "framer-motion";
import { FC, useState } from "react";

type TitleWord = {
  word: string;
  class?: string;
};

type TitleCharObject = {
  chars: string[];
  class?: string;
};

type AnimatedTitleProps = {
  words: TitleWord[];
  textClass: string;
  cursorClass: string;
  callback?: () => void;
};

const splitWordIntoChars = (input: string): string[] => {
  return input.split("");
};

const AnimatedTitle: FC<AnimatedTitleProps> = ({
  words,
  textClass,
  cursorClass,
  callback,
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const wordObjects: TitleCharObject[] = words.map((wordObj) => {
    let chars = splitWordIntoChars(wordObj.word);
    return { class: wordObj.class, chars: chars };
  });

  return (
    <div className="flex h-fit">
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        animate={{
          width: "fit-content",
        }}
        transition={{
          duration: 1.3,
          ease: "linear",
          delay: 0.8,
        }}
        onAnimationComplete={() => {
          callback && callback(), setAnimationComplete(true);
        }}
      >
        <div
          className={textClass}
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {
            <div>
              {wordObjects.map((wordObject, wordId) => (
                <div
                  key={`word-${wordId}`}
                  className={`inline-block ${wordObject.class || "text-white"}`}
                >
                  {wordObject.chars.map((char, charId) => (
                    <span key={`char-${charId}`}>{char}</span>
                  ))}
                  &nbsp;
                </div>
              ))}
            </div>
          }
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: animationComplete ? 0 : Infinity,
          repeatType: "reverse",
        }}
        className={`${animationComplete ? "hidden" : ""} inline-block rounded-sm w-[4px] ${cursorClass}`}
      ></motion.span>
    </div>
  );
};

export default AnimatedTitle;
