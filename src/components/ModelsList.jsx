import React from "react";
import { useStore } from "./store";
import { observer } from "mobx-react-lite";

const ModelList = observer(() => {
  const store = useStore();

  return (
    <div className="model-list">
      {store.models.map((model, index) => (
        <div
          key={index}
          onClick={() => store.selectModel(model)}
          className="model-item"
        >
          {model.name}
        </div>
      ))}
    </div>
  );
});

export default ModelList;