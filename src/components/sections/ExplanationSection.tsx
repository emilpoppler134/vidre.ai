import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRef } from "react";

const ExplanationSection = () => {
  const ref = useRef(null);

  return (
    <>
      <div
        ref={ref}
        id="explanation"
        className="mx-auto mt-16 mb-40 max-w-7xl px-6 sm:px-12 sm:mt-40 lg:px-8 relative"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-violet-600">
            HRC Explanation
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What is the HRC framework
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The HRC framework is a method for crafting engaging scripts,
            particularly suited for short-form content. It stands for Hook,
            Retention, and Call to Action. Here’s a concise overview:
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 max-w-2xl lg:max-w-none mx-auto w-fit mt-16">
          {features.map((feature) => {
            return (
              <motion.div
                key={feature.name}
                className="relative lg:px-8 flex flex-col gap-4 lg:items-center"
              >
                <dt className=" flex flex-col gap-2 lg:items-center">
                  <div className=" flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                </dt>
                <motion.dd className="w-full text-sm sm:text-base lg:text-center leading-6 sm:leading-7 text-gray-600 rounded-xl flex flex-col gap-2">
                  <span className="text-sm sm:text-lg font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </span>
                  {feature.description}
                </motion.dd>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ExplanationSection;

const features = [
  {
    name: "Hook",
    description: (
      <span>
        This is the initial part of your script, meant to{" "}
        <strong className="font-bold">
          capture the viewer's attention right away.
        </strong>{" "}
        The hook should be compelling and relevant, drawing the audience in{" "}
        <strong className="font-bold">within the first few seconds.</strong> It
        might include a striking question, an intriguing statement, or a
        visually appealing element.
      </span>
    ),
    icon: CloudArrowUpIcon,
  },
  {
    name: "Retention",
    description: (
      <span>
        After the hook, the focus shifts to keeping the{" "}
        <strong className="font-bold">viewer's interest.</strong> This section
        includes delivering valuable content,{" "}
        <strong className="font-bold">building curiosity,</strong> or telling a
        story that resonates. The aim is to keep the audience engaged and
        prevent them from losing{" "}
        <strong className="font-bold">interest or clicking away.</strong>
      </span>
    ),
    icon: LockClosedIcon,
  },
  {
    name: "Call to action",
    description: (
      <span>
        The final part of the script should provide a{" "}
        <strong className="font-bold">clear ending</strong> and encourage the
        viewer to take a specific action{" "}
        <strong className="font-bold">(CTA)</strong>. This could include an
        invitation to like, share, subscribe, visit a website, or make a
        purchase. <strong className="font-bold">Alternatively, the AI</strong>{" "}
        can end with a question or conclusion that prompts further thought or
        engagement.
      </span>
    ),
    icon: ArrowPathIcon,
  },
];
