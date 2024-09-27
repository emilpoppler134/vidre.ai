import clsx from "clsx";
import React from "react";

type TStackProps = React.HTMLAttributes<HTMLDivElement> & {
  show: boolean;
};

const TStack = React.forwardRef(
  (
    { children, show, className, ...props }: TStackProps,
    ref: React.Ref<HTMLDivElement>,
  ): React.ReactElement => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, {
          "!opacity-0 !pointer-events-none": !show,
        })}
      >
        {children}
      </div>
    );
  },
);

export default TStack;
