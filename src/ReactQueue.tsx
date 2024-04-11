import React, { useState } from "react";
import CustomInput from "./CustomInput"; // Adjust import paths as needed
import CustomSelect from "./CustomSelect"; // Adjust import paths as needed
import { AppData } from "./models";
import { useSaveQueue } from "./useSaveQueue";
import createSaveQueue from "./createSaveQueue";
import "./styles.css";
import GeneralCard from "./GeneralCard";
import StartCard from "./StartCard";

const initialData: AppData = {
  general: {
    name: "Sample Name",
    id: "001",
    type: "permanent",
  },
  start: {
    month: 1,
    year: 2021,
    duration: 12,
  },
};

const ReactQueue: React.FC = () => {
  const [serverData, setServerData] = useState<AppData>(initialData);
  const [dirtyData, setDirtyData] = useState<AppData>(initialData);

  const handleSaveData = (section: keyof AppData) => {
    addToQueue({ section, data: dirtyData[section] });
  };

  const handleBlur = (section: keyof AppData, field: string, value: string) => {
    setDirtyData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: section === "start" ? parseInt(value, 10) : value,
      },
    }));
  };

  const handleSaveSuccess = (section: string, savedData: any) => {
    setServerData((prev) => ({
      ...prev,
      [section]: savedData,
    }));
  };

  const { addToQueue, queue } = useSaveQueue([], handleSaveSuccess);

  return (
    <div className="card-holder">
      <div>React Queue</div>
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
        <div>
          <h3>Saved Data Queue:</h3>
          <pre>{JSON.stringify(queue, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ReactQueue;
