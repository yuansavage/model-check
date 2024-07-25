import { makeAutoObservable } from "mobx";

class ModelStore {
    constructor(rootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
    modelsList = [];
    modelsData = [];
    selectedModel = null;

    selectedModelData = null;

    setModelsList(list) {
        this.modelsList = list;
    }
    setModelsData(data) {
        this.modelsData.push(data);
    }
    getModelsList() {
        return this.modelsList;
    }
    getSelectedModelData() {
        return this.selectedModelData;
    }
}

export default ModelStore;
