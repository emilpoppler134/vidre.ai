const GradientBackground: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      opacity="0.88"
      width={"100%"}
      height={"100%"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter
          id="bbblurry-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="130"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          rx="207"
          ry="237.5"
          cx="439.40495036659445"
          cy="197.01544668786812"
          fill="#93c5fd"
        ></ellipse>
        <ellipse
          rx="207"
          ry="237.5"
          cx="339.23587147977344"
          cy="113.99665840508425"
          fill="#6d28d9"
        ></ellipse>
        <ellipse
          rx="207"
          ry="237.5"
          cx="644.0104344552724"
          cy="111.22175254622053"
          fill="#6d28d9"
        ></ellipse>
        <ellipse
          rx="207"
          ry="237.5"
          cx="236.9556988621257"
          cy="825.8235821948626"
          fill="#6d28d9"
        ></ellipse>
        <ellipse
          rx="207"
          ry="237.5"
          cx="485.6939339363139"
          cy="921.6421323446704"
          fill="#6d28d9"
        ></ellipse>
      </g>
    </svg>
  );
};

export default GradientBackground;
