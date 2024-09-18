import clsx from "clsx";
import { forwardRef, ReactElement, ReactNode } from "react";
import { ButtonActivityIndicator } from "./ActivityIndicator";
import Link from "./Link";

type AnchorRef = React.ForwardedRef<HTMLAnchorElement>;
type ButtonRef = React.ForwardedRef<HTMLButtonElement>;

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type ButtonGroupProps = {
  children: ReactNode;
  className?: string;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
}) => {
  const classes = clsx(
    className,
    "mt-2 flex flex-col gap-3 sm:flex-row-reverse",
  );
  return <div className={classes}>{children}</div>;
};

const styles = {
  base: [
    "relative inline-flex items-center justify-center",
    "w-full sm:w-auto px-3 py-2",
    "rounded-md shadow-sm active:shadow-focus",
    "transition-colors",
    "text-sm",
  ],
  control: [
    "pointer-events-none",
    "flex justify-center items-center gap-2",
    "[&>svg]:w-4",
  ],
  variants: {
    plain: ["bg-white hover:bg-gray-100", "shadow-none", "text-gray-700"],
    outline: [
      "bg-white hover:bg-gray-100",
      "ring-1 ring-inset ring-gray-300",
      "text-gray-700",
    ],
    submit: ["bg-primary-600 hover:bg-primary-500", "font-semibold text-white"],
    danger: ["bg-red-600 hover:bg-red-500", "font-semibold text-white"],
    primary: [
      "bg-primary-600 hover:bg-primary-500",
      "font-semibold text-white",
      "sm:w-full",
    ],
    colorfull: [
      "bg-gradient-to-r backdrop-blur-md",
      "from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-600",
      "font-semibold text-white",
    ],
  },
};

const createButtonComponent = (variant: keyof typeof styles.variants) =>
  forwardRef(
    (
      {
        children,
        type = "button",
        className,
        disabled = false,
        loading = false,
        href,
        onPress,
      }: ButtonProps,
      ref: ButtonRef | AnchorRef,
    ): ReactElement => {
      const classes = clsx(className, styles.base, styles.variants[variant], {
        "!pointer-events-none": disabled || loading,
      });

      if (href !== undefined) {
        return (
          <Link href={href} className={classes} ref={ref as AnchorRef}>
            {children}
          </Link>
        );
      }

      return (
        <button
          type={type}
          onClick={onPress}
          className={classes}
          ref={ref as ButtonRef}
        >
          <span
            className={clsx(styles.control, {
              "!opacity-0": loading,
              "!opacity-50": !loading && disabled,
            })}
          >
            {children}
          </span>

          {!loading ? null : <ButtonActivityIndicator />}
        </button>
      );
    },
  );

export const Button = createButtonComponent("plain");
export const OutlineButton = createButtonComponent("outline");
export const SubmitButton = createButtonComponent("submit");
export const PrimaryButton = createButtonComponent("primary");
export const DangerButton = createButtonComponent("danger");
export const Colorfull = createButtonComponent("colorfull");

export const GoogleButton = () => (
  <a
    href="#"
    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
        fill="#EA4335"
      />
      <path
        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
        fill="#4285F4"
      />
      <path
        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
        fill="#FBBC05"
      />
      <path
        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
        fill="#34A853"
      />
    </svg>
    <span className="text-sm font-semibold leading-6">Google</span>
  </a>
);
