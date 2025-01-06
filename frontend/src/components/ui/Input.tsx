import React from "react";

type InputProps = {
  title?: string;
  setValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  title,
  setValue,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col  mb-4">
      {title && (
        <label className="text-lg mb-2 bg-white text-black">{title}</label>
      )}
      <input
        {...props}
        onChange={(e) => setValue && setValue(e.target.value)}
        className="bg-slate-300 h-10 rounded-lg px-4 text-black focus:outline-none"
      />
    </div>
  );
};

export default Input;
