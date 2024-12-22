import React, { HTMLInputTypeAttribute } from "react";

type InputProps = {
  title?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  title,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col mb-4">
      {title && (
        <label className="text-lg mb-2 bg-white text-black">{title}</label>
      )}
      <input
        {...props}
        onChange={onChange}
        className="bg-slate-300 h-10 rounded-lg px-4 text-black"
      />
    </div>
  );
};

export default Input;