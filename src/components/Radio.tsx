import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type RadioProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  options: Array<{ bool: boolean; label: string }>;
};

const Radio = <T extends FieldValues>({
  name,
  form,
  options,
}: RadioProps<T>): JSX.Element => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="mt-6 flex flex-col items-start">
          <div className="space-y-4">
            {options.map((option) => (
              <div key={option.label} className="relative">
                <div className="flex items-center">
                  <input
                    checked={option.bool === value}
                    id={option.label}
                    name={option.label}
                    onChange={() => onChange(option.bool)}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor={option.label}
                    className="px-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    {option.label}
                  </label>
                </div>
                <span
                  className="absolute -top-2 -left-2 w-full h-full box-content p-2"
                  onClick={() => onChange(option.bool)}
                ></span>
              </div>
            ))}
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

export default Radio;
