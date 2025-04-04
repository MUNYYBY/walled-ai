import React from "react";
import { FaSpinner } from "react-icons/fa";

import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isLoading,
  className,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {!isLoading ? children : <FaSpinner className="spin" />}
    </button>
  );
};

export default Button;

// import React from "react";
// import { FaSpinner } from "react-icons/fa";
// import "./Button.css";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   isLoading?: boolean;
//   variant?: "primary" | "secondary" | "tertiary";
// }

// const Button: React.FC<ButtonProps> = ({
//   children,
//   onClick,
//   disabled = false,
//   isLoading,
//   className,
//   variant = "primary",
// }) => {
//   const variantClassName = `button_${variant}`;

//   return (
//     <button
//       className={`${variantClassName} ${className || ""}`}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//     >
//       {!isLoading ? children : <FaSpinner className="spin" />}
//     </button>
//   );
// };

// export default Button;
