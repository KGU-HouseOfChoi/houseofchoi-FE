import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  isSuccess?: boolean;
}

export default function Button({
  children,
  fullWidth = false,
  size = "md",
  variant = "primary",
  isLoading = false,
  isSuccess = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "h-[40px] text-lg",
    md: "h-[58px] text-xl",
    lg: "h-[70px] text-2xl",
  };

  const variantClasses = {
    primary:
      "bg-brand-normal text-white hover-supported:bg-brand-hover active:bg-brand-active",
    secondary:
      "bg-grayscale-20 text-textColor-heading hover-supported:bg-grayscale-30 active:bg-grayscale-40",
    outline:
      "border-2 border-brand-normal text-brand-normal hover-supported:bg-brand-normal/5 active:bg-brand-normal/10",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : "w-auto min-w-[200px]"}
        px-4 font-semibold font-pretendard
        rounded-[16px] flex justify-center items-center gap-2
        disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white
        transition-colors duration-200
        ${className}
      `}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : isSuccess ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
