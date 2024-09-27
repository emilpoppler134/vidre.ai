import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type SelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  options: Array<string>;
};

export const Select = <T extends FieldValues>({
  name,
  form,
  options,
}: SelectProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col items-start">
          <Menu as="div" className="group relative inline-flex w-full">
            <div className="w-full max-w-96">
              <Menu.Button
                className={clsx(
                  {
                    "shadow-text-field group-focus-within:shadow-focus": !error,
                  },
                  { "shadow-invalid": !!error },
                  "inline-flex items-center justify-between w-full px-3 py-2 rounded-md bg-white hover:bg-gray-50 transition-[box-shadow]",
                )}
              >
                <span className="flex items-center">
                  {(() => {
                    const selected = options.find((item) => item === value);

                    return (
                      <span className="text-base font-medium text-gray-700">
                        {selected ? selected : "Select"}
                      </span>
                    );
                  })()}
                </span>

                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-72 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {options.map((item) => (
                    <Menu.Item key={item}>
                      <button
                        type="button"
                        className={`block w-full px-4 py-2 hover:bg-gray-100`}
                        onClick={() => onChange(item)}
                      >
                        <div className="flex justify-between">
                          <div className="flex flex-col text-left">
                            <span className="text-sm text-gray-700">
                              {item}
                            </span>
                          </div>

                          {value === item && (
                            <div className="flex items-center">
                              <CheckIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {error && (
            <div className="flex items-center mt-2">
              <ExclamationTriangleIcon
                className="w-4 h-4 fill-red-400"
                aria-hidden="true"
              />
              <span className="block ml-1.5 text-xs text-red-500">
                {error.message}
              </span>
            </div>
          )}
        </div>
      )}
    />
  );
};

export type GridSelectOptionItem = {
  icon?: string | ReactNode;
  value: string;
};

type GridSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  options: Array<GridSelectOptionItem>;
};

export const GridSelect = <T extends FieldValues>({
  name,
  form,
  options,
}: GridSelectProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value } }) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={clsx(
                {
                  "ring-2 ring-primary-300 bg-primary-300/50":
                    option.value === value,
                },
                {
                  "bg-white/20 hover:bg-white/30": option.value !== value,
                },
                "p-4 rounded-md transition-colors",
              )}
            >
              <div className="flex items-center justify-start gap-4 pointer-events-none text-white">
                {option.icon === undefined ? null : (
                  <span className="[&>svg]:w-5">{option.icon}</span>
                )}
                <span className="font-semibold">{option.value}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    />
  );
};
