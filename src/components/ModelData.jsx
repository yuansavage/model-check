import React, { useEffect, useState } from "react";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";

const ModelData = observer(({ id }) => {
    const [modelData, setModelData] = useState(null);
    const { modelStore } = useStores();

    useEffect(() => {
        if (id) {
            const data = modelStore.getSelectedModelData(id);
            setModelData(data[0]);
        }
    }, [id]);

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
