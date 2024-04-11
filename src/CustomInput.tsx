// CustomInput.tsx
import React, { useState } from "react";

interface CustomInputProps {
  id: string;
  name: string;
  initialValue?: string;
  onBlur: (name: string, value: string) => void;
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ id, name, initialValue, onBlur, label }) => {
  const [value, setValue] = useState(initialValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onBlur(name, value);
  };

  return (
    <div className="input-field">
      <label htmlFor={id}>{label}:</label>
      <input id={id} name={name} value={value} onBlur={handleBlur} onChange={handleChange} />
    </div>
  );
};

export default CustomInput;
