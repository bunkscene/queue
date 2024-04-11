// useSaveQueue.ts
import { useEffect, useState } from "react";
import { saveDataToEndpoint } from "./mockApi";
import { GeneralInfo, StartInfo } from "./models";

interface QueueItem {
  section: string;
  data: GeneralInfo | StartInfo;
}

export const useSaveQueue = (
  initialQueue: QueueItem[],
  onSaveSuccess: (section: string, data: GeneralInfo | StartInfo) => void
) => {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const processQueue = async () => {
      if (queue.length > 0 && !isSaving) {
        setIsSaving(true);
        const currentItem = queue[0];
        console.log("Saving", currentItem.section);
        try {
          const response = await saveDataToEndpoint(currentItem.data);
          console.log(`Save successful for ${currentItem.section}:`, response);
          onSaveSuccess(currentItem.section, currentItem.data);
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

  const addToQueue = (item: any) => {
    setQueue((currentQueue) => [...currentQueue, item]);
  };

  return { addToQueue, queue };
};
