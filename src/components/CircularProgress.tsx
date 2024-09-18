import { ReactNode } from "react";

type CircularProgressProps = {
  pathLength: number;
  children: ReactNode;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  pathLength,
  children,
}) => {
  const size = 40;
  const strokeWidth = 2;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pathLength);

  return (
    <div
      style={{ width: size, height: size }}
      className="flex relative items-center justify-center"
    >
      <svg width={size} height={size} className="absolute top-0 left-0">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="transparent"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Foreground Path (Progress) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-violet-500"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.1,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;
