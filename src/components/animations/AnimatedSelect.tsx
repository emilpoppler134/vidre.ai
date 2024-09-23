import { CheckIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ConfigurationItem } from "../../types/graphql";

type AnimatedSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  options: Array<ConfigurationItem | null | undefined> | null | undefined;
  selectionCallback: () => void;
};

const menuVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -10 },
};

const AnimatedSelect = <T extends FieldValues>({
  name,
  form,
  options,
  selectionCallback,
}: AnimatedSelectProps<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value } }) => {
        useEffect(() => {
          if (value) {
            setSelected(value);
            setIsOpen(false);
          }
        }, [value]);

        return (
          <div className="relative text-gray-700">
            <div
              className="flex justify-between items-center py-2 px-3 bg-white rounded-xl cursor-pointer text-sm sm:text-base"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {selected
                ? options?.find((item) => item?.id === value)?.value
                : "Select"}
              <span className="ml-2 w-8 h-8 ">
                <ChevronUpIcon
                  className={clsx(
                    { "rotate-180": isOpen },
                    "transition-transform duration-200",
                  )}
                />
              </span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  className="absolute left-0 sm:-left-5 lg:left-3 right-0 lg:w-4/5 mt-2 z-10"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  <motion.li
                    className="p-3 hover:bg-gray-100 text-white hover:text-black cursor-pointer border border-gray-300/50 rounded-xl my-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-300 hover:via-purple-300 hover:to-fuchsia-300 backdrop-blur-md shadow-md"
                    onClick={() => {
                      onChange("Let Our AI Decide");
                      selectionCallback();
                    }}
                    variants={itemVariants}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h3 className="text-sm sm:text-base">
                          Let Our AI Decide
                        </h3>
                      </div>
                      {"Let Our AI Decide" === value && (
                        <div className="w-5 h-5">
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                  </motion.li>
                  {!options
                    ? null
                    : options.map((option) =>
                        !option ? null : (
                          <motion.li
                            key={option.value}
                            className="p-3 hover:bg-gray-100 text-white hover:text-black cursor-pointer border border-gray-300/50 rounded-xl my-2 backdrop-blur-md shadow-md"
                            onClick={() => {
                              onChange(option.id);
                              selectionCallback();
                            }}
                            variants={itemVariants}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <h3 className="text-sm sm:text-base">
                                  {option.value}
                                </h3>
                                {!option.description ? null : (
                                  <span className="text-xs text-gray-400">
                                    {option.description}
                                  </span>
                                )}
                              </div>
                              {option.value === value && (
                                <div className="w-5 h-5">
                                  <CheckIcon />
                                </div>
                              )}
                            </div>
                          </motion.li>
                        ),
                      )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    />
  );
};

export default AnimatedSelect;
