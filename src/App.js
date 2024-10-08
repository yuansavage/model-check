import { useEffect, useState } from "react";
import ModelList from "./components/ModelsList";
import ModelViewer from "./components/ModelViewer";
import ModelData from "./components/ModelData";
import { observer } from "mobx-react";
import { useStores } from "./stores/useStores";
import API from "./api";
import "./App.css";

const App = observer(() => {
    const { modelStore } = useStores();
    const selectedModelId = modelStore.selectedModelId;

    useEffect(() => {
        API.checkAPIHealth()
            .then((res) => {
                if (res === "Everything is OK") {
                    API.getModelsList()
                        .then((modelsList) => {
                            modelStore.setModelsList(modelsList);
                            modelsList.forEach((model) => {
                                API.getModelMetaData(model.id)
                                    .then((data) => {
                                        modelStore.setModelsData(data);
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "getModelMetaData",
                                            error
                                        );
                                    });
                            });
                        })
                        .catch((error) => {
                            console.error("getModelsList", error);
                        });
                }
            })
            .catch((error) => {
                console.error("checkAPIHealth", error);
            });
    }, []);

    return (
        <>
            <div className="banner-container">
                <img
                    className="banner"
                    src="/banner/planarific.webp"
                    alt="Banner"
                />
            </div>
            <div className="app">
                {" "}
                <div className="left-panel">
                    <ModelList />
                </div>
                <div className="right-panel">
                    <div className="model-viewer-container">
                        <ModelViewer
                            key={selectedModelId}
                            id={selectedModelId}
                        />
                    </div>
                    <div className="model-data-container">
                        <ModelData key={selectedModelId} id={selectedModelId} />
                    </div>
                </div>
            </div>
        </>
    );
});

export default App;
