import React, { FC, useState } from "react";
import ProviderQueueWrapper from "./ProviderQueueWrapper";
import ReactQueue from "./ReactQueue";
import "./styles.css";

const App: FC = () => {
  const [useReactQueue, setUseReactQueue] = useState(true);

  return (
    <div className="App">
      <div>
        <input
          type="checkbox"
          id="chUseReactQueue"
          checked={useReactQueue}
          onChange={() => setUseReactQueue(!useReactQueue)}
        ></input>
        <label htmlFor="chUseReactQueue">Use react queue</label>
      </div>
      {useReactQueue ? <ReactQueue /> : <ProviderQueueWrapper />}
    </div>
  );
};

export default App;
