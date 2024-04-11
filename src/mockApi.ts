// mockApi.ts
export const saveDataToEndpoint = async (data: any): Promise<{ status: string }> => {
  return new Promise((resolve) => {
    console.log("Saving", data);

    setTimeout(() => {
      console.log("Saved", data);
      resolve({ status: "OK" });
    }, 5000);
  });
};
