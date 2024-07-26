import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react";
import { OrbitControls, Torus } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBAFormat } from "three";

const LoadModel = ({ position, error }) => {
    const torusRef = useRef();
    useFrame((state, delta) => {
        if (!error) {
            torusRef.current.rotation.y += 0.2;
        }
    });
    return (
        <Torus args={[5, 0.02, 32, 100]} ref={torusRef} position={position}>
            <meshBasicMaterial color={error ? "red" : "white"} />
        </Torus>
    );
};

const ModelViewer = observer(() => {
    const canvasRef = useRef();
    const groupRef = useRef();
    const meshRef = useRef();
    const [gltf, setGltf] = useState(null);
    const [loading, setLoading] = useState(false);
    const { modelStore } = useStores();
    const selectedModelId = modelStore.selectedModelId;
    const src = modelStore.getSelectedModel(selectedModelId);

    useEffect(() => {
        if (src) {
            const dracoloader = new DRACOLoader().setDecoderPath(
                "https://www.gstatic.com/draco/v1/decoders/"
            );
            const loader = new GLTFLoader();
            loader.setDRACOLoader(dracoloader);
            try {
                setLoading(true);
                loader.load(src, (model) => {
                    model.scene.userData.key =
                        selectedModelId + "-" + Math.random();
                    setGltf(model);
                    setLoading(false);
                });
            } catch (error) {
                console.log("error", error);
                setGltf(null);
                setLoading(false);
            }
        }
    }, [src]);
    useEffect(() => {
        if (gltf) {
            gltf.scene.traverse((object) => {
                if (object.isMesh) {
                    object.material.format = RGBAFormat;
                    object.material.transparent = true;
                    object.material.opacity = 1;
                }
            });
        }
    }, [gltf]);

    return (
        <Canvas
            ref={canvasRef}
            dpr={[1, 1]}
            camera={{ position: [0, 20, 20], fov: 80, far: 500 }}
            className="model-viewer"
        >
            <ambientLight intensity={1} />
            <directionalLight
                intensity={1}
                position={[10, 10, 10]}
                castShadow
            />
            <pointLight intensity={0.8} position={[-10, 10, 10]} />
            {loading && <LoadModel position={[0, 0, 0]}></LoadModel>}
            {!loading && gltf && (
                <group
                    ref={groupRef}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={[1, 1, 1]}
                    dispose={null}
                    visible={true}
                >
                    <primitive
                        object={gltf.scene}
                        ref={meshRef}
                        key={gltf.scene.userData.key}
                    />
                </group>
            )}

            <OrbitControls />
        </Canvas>
    );
});

export default ModelViewer;
