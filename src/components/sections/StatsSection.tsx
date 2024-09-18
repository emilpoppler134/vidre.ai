import { motion } from "framer-motion";

const containerVariants = {
  start: { y: 30, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const parentVariants = {
  start: { x: 30, opacity: 0 },
  end: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const stats = [
  {
    id: 1,
    name: "Unlimited scripts",
    text: "Create viral scripts fast with our free AI Script Generator. Experiment and adapt.",
  },
  {
    id: 2,
    name: "Free voicover",
    text: "Add free voiceovers, featuring different voices and genders, to your scripts. (character limits)",
  },
  {
    id: 3,
    name: "90.2% Success rate",
    text: "The script generator delivers 90.2% high-quality scripts, with easy options for further customization.",
  },
  {
    id: 4,
    name: "Customize Your Projects",
    text: "Easily adjust the script to your liking and add voiceovers for a perfect fit.",
  },
];

const StatsSection: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-40">
      <motion.dl
        variants={containerVariants}
        initial="start"
        whileInView="end"
        viewport={{ once: true }}
        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-gray-700 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="flex flex-col gap-y-3 border-l border-violet-400/70 pl-6"
            variants={parentVariants}
          >
            <dt className="text-sm leading-6">{stat.text}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight">
              {stat.name}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </div>
  );
};

export default StatsSection;
