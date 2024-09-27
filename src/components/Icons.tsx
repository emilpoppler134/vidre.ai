import { motion } from "framer-motion";

type IconProps = {
  className?: string;
};

export const TiktokIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className={className}
    >
      <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
    </svg>
  );
};

export const YoutubeIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className={className}
    >
      <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
    </svg>
  );
};

export const InstagramIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className={className}
    >
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
};

export const FriendsIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className={className}
    >
      <path d="M488.2 59.1C478.1 99.6 441.7 128 400 128s-78.1-28.4-88.2-68.9L303 24.2C298.8 7.1 281.4-3.3 264.2 1S236.7 22.6 241 39.8l8.7 34.9c11 44 40.2 79.6 78.3 99.6L328 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-305.7c38.1-20 67.3-55.6 78.3-99.6L559 39.8c4.3-17.1-6.1-34.5-23.3-38.8S501.2 7.1 497 24.2l-8.7 34.9zM400 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM80 96A48 48 0 1 0 80 0a48 48 0 1 0 0 96zm-8 32c-35.3 0-64 28.7-64 64l0 96 0 .6L8 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-227.3 13 20.5c5.9 9.2 16.1 14.9 27 14.9l48 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-30.4 0-37.4-58.9C157.6 142 132.1 128 104.7 128L72 128z" />
    </svg>
  );
};

export const LogoIcon = () => {
  return (
    <div className="w-28">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 362.79 326.89"
      >
        <defs>
          <linearGradient
            id="linear-gradient-2"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#fcfcff" />
            <stop offset="2%" stopColor="#b1b2fa" />
            <stop offset="12%" stopColor="#f4f5fe" />
            <stop offset="19%" stopColor="#bdbefb" />
            <stop offset="51%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b1b2fa" />
          </linearGradient>
        </defs>
        {/* Fallback path with a solid stroke */}
        <motion.path
          className="fallback-path"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          style={{
            fill: "transparent",
            stroke: "#b1b2fa", // Fallback color
            strokeMiterlimit: 10,
            strokeWidth: "10px",
          }}
          d="M.4,5.42s16.16,41.77,36.74,94.13c32.99,83.94,77.33,195.13,84.66,205.21,7.94,10.91,23.81,23.81,49.09,21.79,24.92-1.99,46.29-18.59,55.81-41.7,30.98-75.18,101.01-252.29,111.99-280.31.75-1.93-2.2-3.54-3.57-3.57-32.28-.72-86.46-1.51-86.54.05-11.07,28.19-63.63,166.81-71.05,186.41-.83,2.2-2.34,4.13-4.41,5.24-2.69,1.44-6.6,1.9-10.53-3.36C152.75,176.16,94.05,15.55,91.12,1.29,1.84,1.83-1.25-1.05.4,5.42Z"
        />
        <motion.path
          className="cls-1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          style={{
            fill: "none",
            stroke: "url(#linear-gradient-2)",
            strokeMiterlimit: 10,
            strokeWidth: "10px",
          }}
          d="M.4,5.42s16.16,41.77,36.74,94.13c32.99,83.94,77.33,195.13,84.66,205.21,7.94,10.91,23.81,23.81,49.09,21.79,24.92-1.99,46.29-18.59,55.81-41.7,30.98-75.18,101.01-252.29,111.99-280.31.75-1.93-2.2-3.54-3.57-3.57-32.28-.72-86.46-1.51-86.54.05-11.07,28.19-63.63,166.81-71.05,186.41-.83,2.2-2.34,4.13-4.41,5.24-2.69,1.44-6.6,1.9-10.53-3.36C152.75,176.16,94.05,15.55,91.12,1.29,1.84,1.83-1.25-1.05.4,5.42Z"
        />
      </motion.svg>
    </div>
  );
};
