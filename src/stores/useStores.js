import React from "react";
import { rootContext } from ".";

export const useStores = ()=> React.useContext(rootContext);