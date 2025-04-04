import { motion } from "framer-motion";

export default function ConnectorAnimation({
  x1,
  x2,
  y1,
  y2,
  className,
  strokeWidth,
}: {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  className?: string;
  strokeWidth: number | string;
}) {
  return (
    <svg className={className}>
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke=""
        strokeWidth={strokeWidth}
        // strokeDasharray={}
      />
      <motion.g
        initial={{
          x1: 0,
          x2: 0,
        }}
        animate={{
          transition: {
            duration: 0.3,
            ease: "easeInOut",
          },
        }}
      ></motion.g>
    </svg>
  );
}
