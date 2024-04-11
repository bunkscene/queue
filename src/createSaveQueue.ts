import { AppData, QueueItem } from "./models";
import { saveDataToEndpoint } from "./mockApi";

const createSaveQueue = (
  version: number,
  onSaveSuccess: (section: keyof AppData, data: any, version: number) => void
) => {
  let queue: QueueItem[] = [];
  let currentVersion = version;
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
      const response = await saveDataToEndpoint(currentItem.data, currentVersion);
      console.log(`Save successful for ${currentItem.section}:`, response);
      currentVersion = response.version;
      onSaveSuccess(currentItem.section, currentItem.data, response.version);
    } catch (error) {
      console.error(`Save failed for ${currentItem.section}:`, error);
    } finally {
      isSaving = false;
      if (queue.length > 0) {
        console.log("Current queue", JSON.stringify(queue));
        processNext(); // Process the next item in the queue if any
      }
    }
  };

  const addToQueue = (item: QueueItem) => {
    queue.push(item);
    if (!isSaving) {
      console.log("Current queue", JSON.stringify(queue));
      processNext();
    }
  };

  return { addToQueue, queue };
};

export default createSaveQueue;
