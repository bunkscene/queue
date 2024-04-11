import React from "react";
import { ReactQueueProvider } from "./ReactQueueProvider";
import ReactQueue from "./ReactQueue";

const ReactQueueWrapper: React.FC = () => {
  return (
    <ReactQueueProvider>
      <ReactQueue />
    </ReactQueueProvider>
  );
};

export default ReactQueueWrapper;
