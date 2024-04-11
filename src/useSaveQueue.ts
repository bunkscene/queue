// useSaveQueue.ts
import { useEffect, useState } from "react";
import { saveDataToEndpoint } from "./mockApi";
import { AppData, GeneralInfo, QueueItem, StartInfo } from "./models";

export const useSaveQueue = (
  initialQueue: QueueItem[],
  version: number,
  onSaveSuccess: (section: keyof AppData, data: GeneralInfo | StartInfo, version: number) => void
) => {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [currentVersion, setCurrentVersion] = useState(version);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const processQueue = async () => {
      if (queue.length > 0 && !isSaving) {
        setIsSaving(true);
        const currentItem = queue[0];
        console.log("Saving", currentItem.section);
        try {
          const response = await saveDataToEndpoint(currentItem.data, currentVersion);
          console.log(`Save successful for ${currentItem.section}:`, response);
          setCurrentVersion(response.version);
          onSaveSuccess(currentItem.section, currentItem.data, response.version);
          setQueue((currentQueue) => currentQueue.slice(1));
        } catch (error) {
          console.error(`Save failed for ${currentItem.section}:`, error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    processQueue();
  }, [queue, isSaving, onSaveSuccess]);

  const addToQueue = (item: QueueItem) => {
    setQueue((currentQueue) => [...currentQueue, item]);
  };

  return { addToQueue, queue };
};
