// ReactQueueContext.tsx
import React, { createContext, FC, useContext, useMemo, PropsWithChildren, useState } from "react";
import { Data, AppData, GeneralInfo, StartInfo, QueueItem } from "./models";
import { useSaveQueue } from "./useSaveQueue";

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

interface ReactQueueContext {
  serverData: AppData;
  dirtyData: AppData;
  currentVersion: number;
  updateDirtyData: (section: keyof AppData, field: string, data: any) => void;
  saveCard: (section: keyof AppData) => void;
  saveMultipleCards: (...cards: (keyof AppData)[]) => void;
  queue: QueueItem[];
}

// Define the context with an initial undefined value or a specific structure
const ReactQueueContext = createContext<ReactQueueContext | undefined>(undefined);

// Define the props for ReactQueueProvider, using PropsWithChildren to include children prop
interface ReactQueueProviderProps {}

export const ReactQueueProvider: FC<PropsWithChildren<ReactQueueProviderProps>> = ({ children }) => {
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
    addToQueue({ section, data: dirtyData[section] });
  };

  const saveMultipleCards = (...cards: (keyof AppData)[]) => {
    cards.forEach((section) => saveCard(section));
  };

  const handleSaveSuccess = (section: keyof AppData, data: GeneralInfo | StartInfo, version: number) => {
    setServerData((prev) => ({
      ...prev,
      [section]: data,
    }));
    setCurrentVersion(version);
  };

  //const reactQueue = useMemo(() => createReactQueue(currentVersion, handleSaveSuccess), []);
  const { addToQueue, queue } = useSaveQueue([], currentVersion, handleSaveSuccess);

  return (
    <ReactQueueContext.Provider
      value={{
        serverData,
        dirtyData,
        currentVersion,
        updateDirtyData,
        saveCard,
        saveMultipleCards,
        queue,
      }}
    >
      {children}
    </ReactQueueContext.Provider>
  );
};

// Hook to use the save queue in components
export const useReactQueue = () => {
  const context = useContext(ReactQueueContext);
  if (!context) {
    throw new Error("useReactQueue must be used within a ReactQueueProvider");
  }
  return context;
};
