export interface GeneralInfo {
  name: string;
  id: string;
  type: "permanent" | "construction";
}

export interface StartInfo {
  month: number;
  year: number;
  duration: number;
}

export interface AppData {
  general: GeneralInfo;
  start: StartInfo;
}

export interface Data {
  data: AppData;
  version: number;
}

export interface QueueItem {
  section: keyof AppData;
  data: GeneralInfo | StartInfo;
}
