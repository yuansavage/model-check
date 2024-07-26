import { makeAutoObservable } from "mobx";

class ModelStore {
    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
    modelsList = [];
    modelsData = [];
    selectedModelId = 0;

    setModelsList(list) {
        this.modelsList = list;
    }
    setModelsData(data) {
        const exists = this.modelsData.some((item) => item.id === data.id);
        if (!exists) {
            this.modelsData.push(data);
        }
    }
    setSelectedModel(id) {
        this.selectedModelId = id;
    }
    getModelsList() {
        return this.modelsList;
    }
    getSelectedModel(id) {
        if (this.modelsData) {
            return this.modelsData.model.filter((model) => model.id === id);
        }
    }
    getSelectedModelData(id) {
        if (this.modelsData) {
            return this.modelsData.filter((model) => model.id === id);
        }
    }
}

export default ModelStore;
