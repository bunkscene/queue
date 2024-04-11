// CustomSelect.tsx
import React, { useState } from "react";

interface CustomSelectProps {
  id: string;
  name: string;
  initialValue?: string;
  onBlur: (name: string, value: string) => void;
  label: string;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ id, name, initialValue, onBlur, label, options }) => {
  const [value, setValue] = useState(initialValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onBlur(name, value);
  };

  return (
    <div className="input-field">
      <label htmlFor={id}>{label}:</label>
      <select id={id} name={name} value={value} onBlur={handleBlur} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
