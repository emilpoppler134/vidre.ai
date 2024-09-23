import { PlusIcon } from "@heroicons/react/24/solid";
import React, { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonTitle,
  onPress,
}) => {
  return (
    <div className="mt-8 px-4 py-12 bg-white">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 text-gray-700">{icon}</div>
        <span className="block text-gray-900 text-sm font-semibold mt-2">
          {title}
        </span>
        <span className="block text-gray-500 text-sm mt-1">{description}</span>
        <div className="mt-6">
          <button
            className="inline-flex items-center rounded-md px-3 py-2 bg-primary-500 hover:bg-primary-600"
            onClick={onPress}
          >
            <PlusIcon className="w-5 h-5 mr-1 fill-white" aria-hidden="true" />
            <span className="text-sm font-semibold text-white">
              {buttonTitle}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
