import { makeAutoObservable } from "mobx";

class ModelStore {
  constructor(rootStore){
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  models = [];
  modelsData = [];
  selectedModel = null;
  selectedModelData = null;


}

export default ModelStore;