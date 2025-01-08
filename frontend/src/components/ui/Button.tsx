import React from "react";

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
