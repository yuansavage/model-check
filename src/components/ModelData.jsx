import React, { useEffect, useState } from "react";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";
import ShowMap from "./ShowMap";

const ModelData = observer(({ id }) => {
  const [modelData, setModelData] = useState(null);
  const [location, setLocation] = useState("");
  const { modelStore } = useStores();

  useEffect(() => {
    if (id) {
      const data = modelStore.getSelectedModelData(id);
      const address =
        data[0].address1 +
        "," +
        data[0].address2 +
        "," +
        data[0].city +
        "," +
        data[0].postal_code +
        "," +
        data[0].state;
      setModelData(data[0]);
      setLocation(address);
    }
  }, [id]);

  if (!modelData) {
    return <div className="model-data">Select a model to see details.</div>;
  }

  return (
    <div className="model-detail">
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
      <div className="map-data" style={{ flex: 1 }}>
        <ShowMap location={location} />
      </div>
    </div>
  );
});

export default ModelData;
