import { useState } from "react";

const LaunchSection: React.FC = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div id="launch" className="relative mt-40 -z-10 px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)",
          }}
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-primary-500">
          Text to Video
        </h2>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          The Big Launch
        </h2>
        <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-600">
          <strong className="font-bold text-gray-800">
            Our script generator is more than just a tool
          </strong>
          —it's an extension of our upcoming{" "}
          <span className="text-primary-500 font-bold ">
            Text to Video Generator
          </span>
          , designed to revolutionize short-form content creation. While most{" "}
          <strong className="font-bold text-gray-800">
            video generators overlook
          </strong>
          the fact that people’s attention spans are short, we see it as an
          opportunity. We're leveraging the same HRC framework (Hook, Retention,
          Call to Action) that the{" "}
          <strong className="font-bold text-gray-800">
            biggest content creators
          </strong>{" "}
          use to keep their audience engaged from start to finish.
        </p>

        {showMore && (
          <>
            <p className="mx-auto mt-6 mb-4 max-w-4xl text-lg leading-8 text-gray-600">
              Our service will seamlessly combine{" "}
              <strong className="font-bold text-gray-800">
                video, images, text, music, sound effects, and more
              </strong>
              , all tailored to go viral. And yes, you’ll have the power to make
              adjustments as you like. We're taking a more creative approach,
              breaking away from the typical methods.{" "}
              <strong className="font-bold text-gray-800">
                But spots are limited
              </strong>
              —secure your place for our Text to Video drop by{" "}
              <strong className="font-bold text-gray-800">
                entering your email!
              </strong>
            </p>
          </>
        )}

        <p
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-gray-500/70 hover:text-gray-600 cursor-pointer"
        >
          {showMore ? "Hide..." : "Show more..."}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-1/2 right-0 top-full -z-10 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
};

export default LaunchSection;
