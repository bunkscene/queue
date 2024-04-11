import React, { useState } from "react";
import CustomInput from "./CustomInput"; // Adjust import paths as needed
import CustomSelect from "./CustomSelect"; // Adjust import paths as needed
import { AppData } from "./models";
import { useSaveQueue } from "./useSaveQueue";
import createSaveQueue from "./createSaveQueue";
import "./styles.css";
import { SaveQueueProvider } from "./SaveQueueProvider";
import ProviderQueue from "./ProviderQueue";

const ProviderQueueWrapper: React.FC = () => {
  return (
    <SaveQueueProvider>
      <ProviderQueue />
    </SaveQueueProvider>
  );
};

export default ProviderQueueWrapper;
