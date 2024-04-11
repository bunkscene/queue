// GeneralCard.tsx
import React from "react";
import Card from "./Card";
import CustomInput from "./CustomInput"; // Import your CustomInput component
import CustomSelect from "./CustomSelect"; // Import your CustomSelect component
import { AppData, GeneralInfo } from "./models";

interface GeneralCardProps {
  data: GeneralInfo;
  onSave: (section: keyof AppData) => void;
  onFieldBlur: (section: keyof AppData, field: string, value: any) => void;
}

const GeneralCard: React.FC<GeneralCardProps> = ({ data, onSave, onFieldBlur }) => {
  const handleBlur = (name: string, value: string) => {
    onFieldBlur("general", name, value);
  };

  const handleSave = () => {
    onSave("general");
  };

  return (
    <Card title="General" onSave={handleSave}>
      <CustomInput id="general-name" name="name" label="Name" initialValue={data.name} onBlur={handleBlur} />
      <CustomInput id="general-id" name="id" label="ID" initialValue={data.id} onBlur={handleBlur} />
      <CustomSelect
        id="general-type"
        name="type"
        label="Type"
        initialValue={data.type}
        onBlur={handleBlur}
        options={[
          { value: "permanent", label: "Permanent" },
          { value: "construction", label: "Construction" },
        ]}
      />
    </Card>
  );
};

export default GeneralCard;
