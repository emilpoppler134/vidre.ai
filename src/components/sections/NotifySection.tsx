import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NotifySection: React.FC = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const width = useTransform(scrollYProgress, [0.5, 1], ["85vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0.5, 1], ["40vh", "100vh"]);
  const formY = useTransform(scrollYProgress, [0.5, 0.8], [100, 0]);
  const formOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const marginTop = useTransform(scrollYProgress, [0.5, 0.8], ["6rem", "0rem"]);

  return (
    <div
      ref={ref}
      className="mx-auto mt-32 sm:mt-56 overflow-x-hidden min-h-screen"
    >
      <motion.div
        style={{ height, width }}
        className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl rounded-2xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20 mx-auto grid place-content-center"
      >
        <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
        <div
          aria-hidden="true"
          className="absolute -left-80 -top-56 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
          />
        </div>
        <div
          aria-hidden="true"
          className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
          />
        </div>
        <motion.div
          className="relative mx-auto max-w-[70vw]"
          style={{ marginTop }}
        >
          <h2 className="text-white font-bold text-2xl sm:text-3xl text-center">
            Get notified when we're launching our text to video AI.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300/70 text-center">
            spots are limited—secure your place by entering your email!
          </p>

          <motion.form
            className="mt-16 flex h-10 gap-4 items-center justify-center flex-wrap"
            style={{ opacity: formOpacity, y: formY }}
          >
            <input
              type="text"
              name="email"
              id="email-input"
              placeholder="Enter your email"
              className="h-full sm:w-72 px-2 rounded-md text-gray-300 bg-slate-300/20 backdrop-blur-md border border-gray-500/60 placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="h-full border bg-white rounded-md font-semibold font-gray-700 px-4"
            >
              Notify me
            </button>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotifySection;
