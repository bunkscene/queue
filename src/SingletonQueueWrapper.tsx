import React from "react";
import { SingletonQueueProvider } from "./SingletonQueueProvider";
import SingeltonQueue from "./SingletonQueue";

const SingletonQueueWrapper: React.FC = () => {
  return (
    <SingletonQueueProvider>
      <SingeltonQueue />
    </SingletonQueueProvider>
  );
};

export default SingletonQueueWrapper;
