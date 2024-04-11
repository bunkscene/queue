import React, { useState } from "react";
import CustomInput from "./CustomInput"; // Adjust import paths as needed
import CustomSelect from "./CustomSelect"; // Adjust import paths as needed
import { AppData } from "./models";
import createSaveQueue from "./createSaveQueue";
import "./styles.css";
import { useSaveQueue } from "./SaveQueueProvider";
import GeneralCard from "./GeneralCard";
import StartCard from "./StartCard";

const ProviderQueue: React.FC = () => {
  const { serverData, dirtyData, updateDirtyData, saveCard } = useSaveQueue();

  const handleSaveData = (section: keyof AppData) => {
    saveCard?.(section);
  };

  const handleBlur = (section: keyof AppData, field: string, value: string) => {
    updateDirtyData?.(section, field, value);
  };

  return (
    <div className="card-holder">
      <div>Provider Queue</div>
      <GeneralCard data={dirtyData.general} onSave={handleSaveData} onFieldBlur={handleBlur} />
      <StartCard data={dirtyData.start} onSave={handleSaveData} onFieldBlur={handleBlur} />
      <div className="data-display">
        <div>
          <h3>Initial Data:</h3>
          <pre>{JSON.stringify(serverData, null, 2)}</pre>
        </div>
        <div>
          <h3>Current Data:</h3>
          <pre>{JSON.stringify(dirtyData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProviderQueue;
