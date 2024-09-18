import { useState } from "react";
import Login from "../components/dialogs/Login";
import Explore from "../components/sections/ExploreSection";
import Hero from "../components/sections/HeroSection";
import Launch from "../components/sections/LaunchSection";
import Notify from "../components/sections/NotifySection";
import Stats from "../components/sections/StatsSection";

export default function LandingPage() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="bg-white w-full h-full">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="w-12 h-12 select-none">
            <img src="/shadow-logo.png" alt="Logo" />
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <button
              onClick={() => setOpen(true)}
              className="group px-2.5 py-1.5 rounded-md text-gray-700"
            >
              <div className="flex items-center gap-1">
                <span className="font-medium">Login</span>
                <svg
                  className="HoverArrow"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <g fillRule="evenodd">
                    <path className="HoverArrow__linePath" d="M0 5h7"></path>
                    <path
                      className="HoverArrow__tipPath"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="group px-2.5 py-1.5 rounded-lg text-base text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className="font-semibold">Get started</span>
                <svg
                  className="HoverArrow"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <g fillRule="evenodd">
                    <path className="HoverArrow__linePath" d="M0 5h7"></path>
                    <path
                      className="HoverArrow__tipPath"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-24 h-full isolate">
        <Hero setOpen={() => setOpen(true)} />
        <Explore setOpen={() => setOpen(true)} />
        <Stats />
        <Launch />
        <Notify />
      </main>

      <Login open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
