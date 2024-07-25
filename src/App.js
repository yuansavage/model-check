import {useEffect,useState} from "react";
import ModelList from "./components/ModelsList";
import ModelViewer from "./components/ModelViewer";
import ModelData from "./components/ModelData";
import { observer } from "mobx-react";
import {useStores } from "./stores/useStores"
import API from "./api";
import "./App.css";

const App = observer(() => {
  const {modelStore}  = useStores()
  return (
    <div className="app">
      <div className="left-panel">
        <ModelList />
      </div>
      <div className="right-panel">
        <div className="model-viewer-container">
          <ModelViewer />
        </div>
        <div className="model-data-container">
          <ModelData />
        </div>
      </div>
    </div>
  );
});

export default App;
