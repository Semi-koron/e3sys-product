import React from "react";

type CheckBoxProps = {
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  techId: number;
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckBox: React.FC<CheckBoxProps> = ({
  children,
  setValue,
  value,
  techId,
  ...props
}: CheckBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue((prev: number[]) => [...prev, techId]);
    } else {
      // techIdを削除
      setValue((prev: number[]) => prev.filter((id) => id !== techId));
    }
  };
  return (
    <>
      <div className="flex flex-row mb-4">
        <input {...props} type="checkbox" onChange={handleChange} />
        <label className="text-lg_} bg-white text-black">{children}</label>
      </div>
    </>
  );
};

export default CheckBoxProps;
