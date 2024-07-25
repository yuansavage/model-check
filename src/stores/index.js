import React from "react";
import ModelStore from "./ModelStore";

class RootStore{
  constructor(){
    this.modelStore = new ModelStore(this)
  }
}

export const rootContext = React.createContext(new RootStore());