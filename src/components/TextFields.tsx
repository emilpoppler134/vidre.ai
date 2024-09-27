import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type TextFieldProps<TFieldValues extends FieldValues> = {
  autoComplete?: string;
  autofocus?: true;
  className?: string;
  defaultValue?: true;
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  onChange?: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  title?: string;
  type?: "text" | "password";
};

export const TextField = <T extends FieldValues>({
  autoComplete = "off",
  autofocus,
  className,
  defaultValue,
  form,
  name,
  onChange,
  onKeyPress,
  placeholder = "",
  title,
  type = "text",
}: TextFieldProps<T>): JSX.Element => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange: onControllerChange, onBlur, ref, value = "" },
        fieldState: { error },
      }) => (
        <div>
          <div
            className={clsx(
              className,
              {
                "shadow-text-field [&:has(input:focus-within)]:shadow-focus":
                  !error,
                "shadow-invalid": !!error,
              },
              "relative w-full h-11 apperance-none rounded-md bg-white transition-[box-shadow] ease-in duration-75",
            )}
          >
            <div className="group w-full h-full">
              {title === undefined ? null : (
                <span
                  className={clsx(
                    {
                      "top-0 scale-75 origin-top-left":
                        inputFocus ||
                        value !== "" ||
                        (form.getValues(name) === undefined && defaultValue),
                      "top-2/4 scale-1 origin-center":
                        !inputFocus &&
                        value === "" &&
                        (form.getValues(name) !== undefined || !defaultValue),
                      "text-gray-500 group-has-[:focus-within]:text-field-focus":
                        !error,
                      "text-field-invalid": !!error,
                    },
                    "pointer-events-none absolute left-3 -translate-y-2/4 px-1 text-base bg-white transition-[transform,top] duration-200 ease-in-out",
                  )}
                >
                  <span>{title}</span>
                </span>
              )}

              <input
                type={type}
                name={name}
                id={name}
                ref={ref}
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                  onControllerChange(e.target.value);
                  onChange?.();
                }}
                onFocus={() => setInputFocus(true)}
                onBlur={() => {
                  onBlur();
                  setInputFocus(false);
                }}
                onKeyUp={(e) => {
                  if (!inputFocus) return;
                  onKeyPress?.(e);
                }}
                autoCapitalize="off"
                autoComplete={autoComplete}
                autoCorrect="false"
                autoFocus={autofocus ?? false}
                spellCheck="false"
                className="w-full h-full py-2 px-3 appearance-none outline-none !border-none !ring-0 rounded-md text-base"
              />
            </div>
          </div>

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

export const InputField = <T extends FieldValues>({
  autoComplete,
  autofocus,
  className,
  form,
  name,
  placeholder = "",
  title,
  type = "text",
}: TextFieldProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, ref, value },
        fieldState: { error },
      }) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-6 text-white/90">
            {title}
          </span>

          <input
            type={type}
            name={name}
            id={name}
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => onBlur()}
            autoCapitalize="off"
            autoComplete={
              (autoComplete ?? type === "password") ? "new-password" : "off"
            }
            autoCorrect="false"
            autoFocus={autofocus ?? false}
            spellCheck="false"
            className={clsx(
              className,
              "mt-1 w-full py-2 px-3 rounded-md text-base placeholder:text-gray-400",
              "appearance-none outline-none !border-none !ring-0",
            )}
          />

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
