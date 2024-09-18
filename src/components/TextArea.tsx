import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type TextAreaProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  placeholder?: string;
  autoFocus?: true;
};

const TextArea = <T extends FieldValues>({
  name,
  form,
  placeholder,
  autoFocus,
}: TextAreaProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, ref, value = "" },
        fieldState: { error },
      }) => (
        <div className="flex flex-col h-full">
          <div
            className={clsx(
              {
                "shadow-text-field [&:has(input:focus-within)]:shadow-focus":
                  !error,
                "shadow-invalid": !!error,
              },
              "relative w-full h-full apperance-none rounded-md bg-white transition-[box-shadow] ease-in duration-75",
            )}
          >
            <textarea
              name={name}
              id={name}
              ref={ref}
              value={value}
              rows={7}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => onBlur()}
              autoFocus={autoFocus ?? false}
              onFocus={(e) => {
                const tmp = e.target.value;
                e.target.value = "";
                e.target.value = tmp;
              }}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="false"
              className="w-full h-full py-2 px-3 appearance-none resize-none outline-none !border-none !ring-0 rounded-md text-base"
            />
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

export default TextArea;
