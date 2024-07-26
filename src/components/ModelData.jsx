import React, { useEffect, useState } from "react";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";

const ModelData = observer(() => {
    const [modelData, setModelData] = useState(null);
    const { modelStore } = useStores();
    const selectedModelId = modelStore.selectedModelId;

    useEffect(() => {
        if (selectedModelId) {
            const data = modelStore.getSelectedModelData(selectedModelId);
            setModelData(data[0]);
        }
    }, [selectedModelId]);

    if (!modelData) {
        return <div className="model-data">Select a model to see details.</div>;
    }

    return (
        <div className="model-data">
            {Object.entries(modelData).map(
                ([key, value]) =>
                    key !== "thumbnail" &&
                    key !== "model" && (
                        <div key={key} className="model-data-item">
                            <strong>{key}:</strong>
                            <span>
                                {typeof value === "object" && value !== null
                                    ? JSON.stringify(value)
                                    : value.toString()}
                            </span>
                        </div>
                    )
            )}
        </div>
    );
});

export default ModelData;
