import { XCircleIcon } from "@heroicons/react/20/solid";

type WarningProps = {
  errors: Array<string>;
};

const Warning: React.FC<WarningProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="fixed top-6 left-2/4 pl-72 -translate-x-2/4 w-full max-w-4xl">
      <div className="rounded-md shadow-lg bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There were {errors.length} error{errors.length > 1 && "s"}
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                {errors.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
