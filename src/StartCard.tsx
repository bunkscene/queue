import React from "react";
import Card from "./Card";
import CustomInput from "./CustomInput"; // Import your CustomInput component
import CustomSelect from "./CustomSelect"; // Import your CustomSelect component
import { AppData, StartInfo } from "./models";

interface StartCardProps {
  data: StartInfo;
  onSave: (section: keyof AppData) => void;
  onFieldBlur: (section: keyof AppData, field: string, value: any) => void;
}

const StartCard: React.FC<StartCardProps> = ({ data, onSave, onFieldBlur }) => {
  const handleBlur = (name: string, value: string) => {
    onFieldBlur("start", name, value);
  };

  const handleSave = () => {
    onSave("start");
  };

  return (
    <Card title="Start" onSave={handleSave}>
      <CustomInput
        id="start-month"
        name="month"
        initialValue={data.month.toString()}
        label="Month"
        onBlur={handleBlur}
      />
      <CustomInput id="start-year" name="year" initialValue={data.year.toString()} label="Year" onBlur={handleBlur} />
      <CustomInput
        id="start-duration"
        name="duration"
        initialValue={data.duration.toString()}
        label="Duration"
        onBlur={handleBlur}
      />
    </Card>
  );
};

export default StartCard;
