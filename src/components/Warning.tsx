import { XCircleIcon } from "@heroicons/react/20/solid";

type WarningProps = {};

const Warning: React.FC<WarningProps> = () => {
  return (
    <div className="fixed top-6 left-2/4 -translate-x-2/4">
      <div className="rounded-md shadow-lg bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There were 2 errors with your submission
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                <li>Your password must be at least 8 characters</li>
                <li>
                  Your password must include at least one pro wrestling
                  finishing move
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
