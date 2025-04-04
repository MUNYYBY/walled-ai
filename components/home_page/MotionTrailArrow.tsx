import { motion } from "framer-motion";

export default function MotionTrailArrow({
  width = 141,
  height = 9,
  className = "",
  duration = 2,
  colorStart = "#8281B1",
  colorEnd = "#C3C2E0",
  trailCount = 2,
  trailDelay = 0.5,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
  duration?: number;
  colorStart?: string;
  colorEnd?: string;
  trailCount?: number;
  trailDelay?: number;
}) {
  // Arrow path data
  const arrowPath =
    "M140.398 4.75376C140.594 4.5585 140.594 4.24192 140.398 4.04665L137.216 0.864674C137.021 0.669411 136.705 0.669411 136.509 0.864674C136.314 1.05994 136.314 1.37652 136.509 1.57178L139.338 4.40021L136.509 7.22863C136.314 7.4239 136.314 7.74048 136.509 7.93574C136.705 8.131 137.021 8.131 137.216 7.93574L140.398 4.75376ZM140.045 3.90021L-5.96904e-09 3.90021L5.96904e-09 4.90021L140.045 4.90021L140.045 3.90021Z";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 141 9"
      fill="none"
      className={`${className}`}
    >
      <defs>
        <linearGradient
          id="motionTrailGradient"
          x1="-6.6851"
          y1="-46.6066"
          x2="140.045"
          y2="4.4002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colorStart} stopOpacity="0" />
          <stop offset="1" stopColor={colorEnd} />
        </linearGradient>
      </defs>

      {Array.from({ length: trailCount }).map((_, index) => (
        <motion.path
          key={index}
          d={arrowPath}
          fill="url(#motionTrailGradient)"
          initial={{ x: -140 * (index + 1) }}
          animate={{
            x: -140 * index,
            transition: {
              duration,
              ease: "linear",
              repeat: Infinity,
              delay: index * trailDelay,
            },
          }}
        />
      ))}
    </svg>
  );
}
