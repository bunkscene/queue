// mockApi.ts
export const saveDataToEndpoint = async (data: any, version: number): Promise<{ status: string; version: number }> => {
  return new Promise((resolve) => {
    console.log("Saving", data);

    setTimeout(() => {
      console.log("Saved", data);
      resolve({ status: "OK", version: ++version });
    }, 5000);
  });
};
