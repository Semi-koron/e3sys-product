import React, { HTMLInputTypeAttribute } from "react";

type InputProps = {
  title?: string;
  setValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  title,
  setValue,
  ...props
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="flex flex-col  mb-4">
      {title && (
        <label className="text-lg mb-2 bg-white text-black">{title}</label>
      )}
      <input
        {...props}
        onChange={handleChange}
        className="bg-slate-300 h-10 w-full px-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
      />
    </div>
  );
};

export default Input;
