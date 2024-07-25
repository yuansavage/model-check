import React from "react";
import { useStore } from "./store";
import { observer } from "mobx-react-lite";

const ModelData = observer(() => {
  const store = useStore();

  if (!store.modelData) {
    return <div className="model-data">Select a model to see details.</div>;
  }

  return (
    <div className="model-data">
      <h2>{store.modelData.name}</h2>
      <p>{store.modelData.description}</p>
      {/* 添加更多模型數據顯示 */}
    </div>
  );
});

export default ModelData;