import { motion } from "framer-motion";
import scrollToSection from "../../utils/scroll-to-section";

type HeroSectionProps = {
  setOpen: () => void;
};

const h1Variants = {
  start: { y: 30, opacity: 0, scale: 0.9 },
  end: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 2 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
};

const pVariants = {
  start: { y: 30, opacity: 0, scale: 0.9 },
  end: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 1.5 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
};

const buttonVariants = {
  start: { y: 15, opacity: 0, scale: 0 },
  end: (delay: number) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: delay,
      duration: 0.5,
    },
  }),
};

const HeroSection: React.FC<HeroSectionProps> = ({ setOpen }) => {
  return (
    <div className="relative pt-14 min-h-screen">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              className="text-5xl font-figTree font-bold tracking-tight text-gray-900 sm:text-7xl"
              variants={h1Variants}
              initial="start"
              animate="end"
            >
              Create Professional{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 inline-block text-transparent bg-clip-text">
                Scripts
              </span>{" "}
              for Free
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600"
              variants={pVariants}
              initial="start"
              animate="end"
            >
              The script generator uses the{" "}
              <span className="font-bold">HRC framework</span> (Hook, Retention,
              Call to Action) to craft engaging and effective scripts.{" "}
              <span className="font-bold">The script generator</span> is an
              extension of our upcoming{" "}
              <span className="text-primary-500 font-bold opacity-95">
                Text to Video Generator
              </span>
              .
            </motion.p>
            <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
              <motion.div
                custom={0.2}
                variants={buttonVariants}
                initial="start"
                animate="end"
                className="rounded-md bg-primary-400 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <button onClick={setOpen} className="block px-5 py-3">
                  Get started
                </button>
              </motion.div>
              <motion.button
                custom={0.35}
                variants={buttonVariants}
                initial="start"
                animate="end"
                onClick={() => scrollToSection("explanation")}
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              >
                Learn more <span aria-hidden="true">↓</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
