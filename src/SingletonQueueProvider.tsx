// SingletonQueueContext.tsx
import React, { createContext, FC, useContext, useMemo, PropsWithChildren, useState } from "react";
import createSingletonQueue from "./createSaveQueue";
import { Data, AppData } from "./models";

const initialData: Data = {
  data: {
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
  },
  version: 1,
};

interface SingletonQueueContext {
  serverData: AppData;
  dirtyData: AppData;
  currentVersion: number;
  updateDirtyData: (section: keyof AppData, field: string, data: any) => void;
  saveCard: (section: keyof AppData) => void;
  saveMultipleCards: (...cards: (keyof AppData)[]) => void;
}

// Define the context with an initial undefined value or a specific structure
const SingletonQueueContext = createContext<SingletonQueueContext | undefined>(undefined);

// Define the props for SingletonQueueProvider, using PropsWithChildren to include children prop
interface SingletonQueueProviderProps {}

export const SingletonQueueProvider: FC<PropsWithChildren<SingletonQueueProviderProps>> = ({ children }) => {
  const [serverData, setServerData] = useState<AppData>(initialData.data);
  const [dirtyData, setDirtyData] = useState<AppData>(initialData.data);
  const [currentVersion, setCurrentVersion] = useState(initialData.version);

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
    singletonQueue.addToQueue({ section, data: dirtyData[section] });
  };

  const saveMultipleCards = (...cards: (keyof AppData)[]) => {
    cards.forEach((section) => saveCard(section));
  };

  const handleSaveSuccess = (section: keyof AppData, data: any, version: number) => {
    setServerData((prev) => ({
      ...prev,
      [section]: data,
    }));
    setCurrentVersion(version);
  };

  const singletonQueue = useMemo(() => createSingletonQueue(currentVersion, handleSaveSuccess), []);

  return (
    <SingletonQueueContext.Provider
      value={{
        serverData,
        dirtyData,
        currentVersion,
        updateDirtyData,
        saveCard,
        saveMultipleCards,
      }}
    >
      {children}
    </SingletonQueueContext.Provider>
  );
};

// Hook to use the save queue in components
export const useSingletonQueue = () => {
  const context = useContext(SingletonQueueContext);
  if (!context) {
    throw new Error("useSingletonQueue must be used within a SingletonQueueProvider");
  }
  return context;
};
