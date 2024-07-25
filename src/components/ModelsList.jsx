import React from "react";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";

const ModelList = observer(() => {
    const { modelStore } = useStores();
    const modelsList = modelStore.getModelsList();

    return (
        <div className="model-list">
            {modelsList.map((model, index) => (
                <div key={index} className="model-item">
                    <img
                        src={model.thumbnail}
                        alt={`${model.description} thumbnail`}
                        className="model-thumbnail"
                    />
                    <p>{model.description}</p>
                </div>
            ))}
        </div>
    );
});

export default ModelList;
