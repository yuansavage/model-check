import React from "react";
import { Canvas } from "@react-three/fiber";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = observer(() => {
    const { modelStore } = useStores();

    // const { scene } = useGLTF(store.selectedModel ? store.selectedModel.url : "");

    return (
        <Canvas className="model-viewer">
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />
            {/* <primitive object={scene} /> */}
            <OrbitControls />
        </Canvas>
    );
});

export default ModelViewer;
