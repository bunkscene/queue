import React, { FC, useState } from "react";
import SingletonQueueWrapper from "./SingletonQueueWrapper";
import ReactQueueWrapper from "./ReactQueueWrapper";
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
      {useReactQueue ? <ReactQueueWrapper /> : <SingletonQueueWrapper />}
    </div>
  );
};

export default App;
