import React, { useState } from "react";
import CustomInput from "./CustomInput"; // Adjust import paths as needed
import CustomSelect from "./CustomSelect"; // Adjust import paths as needed
import { AppData } from "./models";
import createSaveQueue from "./createSaveQueue";
import "./styles.css";
import { useSingletonQueue } from "./SingletonQueueProvider";
import GeneralCard from "./GeneralCard";
import StartCard from "./StartCard";

const SingeltonQueue: React.FC = () => {
  const { serverData, dirtyData, currentVersion, updateDirtyData, saveCard, saveMultipleCards } = useSingletonQueue();

  const handleSaveData = (section: keyof AppData) => {
    saveCard?.(section);
  };

  const handleBlur = (section: keyof AppData, field: string, value: string) => {
    updateDirtyData?.(section, field, value);
  };

  const handleSaveAll = () => saveMultipleCards("general", "start");

  return (
    <div className="card-holder">
      <div className="header">
        <div>Singleton Queue</div>
        <button onClick={handleSaveAll}>Save All</button>
      </div>
      <GeneralCard data={dirtyData.general} onSave={handleSaveData} onFieldBlur={handleBlur} />
      <StartCard data={dirtyData.start} onSave={handleSaveData} onFieldBlur={handleBlur} />
      <div className="data-display">
        <div>
          <h3>Server Data:</h3>
          <pre>{JSON.stringify(serverData, null, 2)}</pre>
          <pre>Version: {currentVersion}</pre>
        </div>
        <div>
          <h3>Current Data:</h3>
          <pre>{JSON.stringify(dirtyData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default SingeltonQueue;
