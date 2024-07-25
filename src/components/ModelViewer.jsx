import React from "react";
import { Canvas } from "@react-three/fiber";
import { useStore } from "./store";
import { observer } from "mobx-react";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = observer(() => {
  const store = useStore();
  const { scene } = useGLTF(store.selectedModel ? store.selectedModel.url : "");

  return (
    <Canvas className="model-viewer">
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <primitive object={scene} />
      <OrbitControls />
    </Canvas>
  );
});

export default ModelViewer;