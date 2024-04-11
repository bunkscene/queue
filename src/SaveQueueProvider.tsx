// SaveQueueContext.tsx
import React, { createContext, FC, useContext, useMemo, PropsWithChildren, useState } from "react";
import createSaveQueue from "./createSaveQueue";
import { AppData } from "./models";

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

interface SaveQueueContext {
  serverData: AppData;
  dirtyData: AppData;
  updateDirtyData: (section: keyof AppData, field: string, data: any) => void;
  saveCard: (section: keyof AppData) => void;
}

// Define the context with an initial undefined value or a specific structure
const SaveQueueContext = createContext<SaveQueueContext | undefined>(undefined);

// Define the props for SaveQueueProvider, using PropsWithChildren to include children prop
interface SaveQueueProviderProps {}

export const SaveQueueProvider: FC<PropsWithChildren<SaveQueueProviderProps>> = ({ children }) => {
  const [serverData, setServerData] = useState<AppData>(initialData);
  const [dirtyData, setDirtyData] = useState<AppData>(initialData);

  const updateDirtyData = (section: keyof AppData, field: string, value: string) => {
    setDirtyData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: section === "start" ? parseInt(value, 10) : value,
      },
    }));
  };

  const saveCard = (section: keyof AppData) => {
    saveQueue.addToQueue({ section, data: dirtyData[section] });
  };

  const handleSaveSuccess = (section: keyof AppData, data: any) => {
    setServerData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveQueue = useMemo(() => createSaveQueue(handleSaveSuccess), []);

  return (
    <SaveQueueContext.Provider
      value={{
        serverData,
        dirtyData,
        updateDirtyData,
        saveCard,
      }}
    >
      {children}
    </SaveQueueContext.Provider>
  );
};

// Hook to use the save queue in components
export const useSaveQueue = () => {
  const context = useContext(SaveQueueContext);
  if (!context) {
    throw new Error("useSaveQueue must be used within a SaveQueueProvider");
  }
  return context;
};
