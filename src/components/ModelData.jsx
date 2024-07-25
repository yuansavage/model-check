import React from "react";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";

const ModelData = observer(() => {
    const { modelStore } = useStores();

    // if (!store.modelData) {
    //   return <div className="model-data">Select a model to see details.</div>;
    // }

    return (
        <div className="model-data">
            {/* <h2>{store.modelData.name}</h2>
      <p>{store.modelData.description}</p> */}
        </div>
    );
});

export default ModelData;
