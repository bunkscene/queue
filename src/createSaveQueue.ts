import { AppData, GeneralInfo, StartInfo } from "./models";
import { saveDataToEndpoint } from "./mockApi";

interface QueueItem {
  section: keyof AppData;
  data: GeneralInfo | StartInfo;
}

const createSaveQueue = (onSaveSuccess: (section: keyof AppData, data: any) => void) => {
  let queue: QueueItem[] = [];
  let isSaving = false;

  const processNext = async () => {
    if (isSaving || queue.length === 0) return; // If already saving or no items in queue, exit
    isSaving = true;

    const currentItem = queue.shift(); // Retrieve the next item to save
    if (!currentItem) {
      isSaving = false; // Safety check, should never hit this due to the guard clause above
      return;
    }

    try {
      const response = await saveDataToEndpoint(currentItem.data);
      console.log(`Save successful for ${currentItem.section}:`, response);
      onSaveSuccess(currentItem.section, currentItem.data);
    } catch (error) {
      console.error(`Save failed for ${currentItem.section}:`, error);
    } finally {
      isSaving = false;
      if (queue.length > 0) {
        processNext(); // Process the next item in the queue if any
      }
    }
  };

  const addToQueue = (item: QueueItem) => {
    queue.push(item);
    if (!isSaving) {
      processNext();
    }
  };

  return { addToQueue, queue };
};

export default createSaveQueue;
