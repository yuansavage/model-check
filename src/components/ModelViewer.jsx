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

const ModelViewer = observer(({ id }) => {
    const groupRef = useRef();
    const meshRef = useRef();
    const controlRef = useRef();
    const [gltf, setGltf] = useState(null);
    const [loading, setLoading] = useState(false);
    const { modelStore } = useStores();

    const src = modelStore.getSelectedModel(id);

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
                    model.scene.userData.key = id + "-" + Math.random();
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

    const resetCamera = () => {
        if (controlRef && controlRef.current) {
            controlRef.current.reset();
        }
    };
    const checkWireFrame = () => {};

    return (
        <div className="canvas-container">
            <Canvas
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
                        onClick={() => {
                            controlRef.current && controlRef.current.reset();
                        }}
                    >
                        <primitive
                            object={gltf.scene}
                            ref={meshRef}
                            key={gltf.scene.userData.key}
                        />
                    </group>
                )}

                <OrbitControls ref={controlRef} />
            </Canvas>
            <div className="canvas-buttons">
                <button
                    onClick={resetCamera}
                    className="canvas-button"
                    data-tip="reset camera"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z" />
                    </svg>
                </button>
                <button onClick={checkWireFrame} className="canvas-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM4 6h16v3H4V6zm0 5h16v3H4v-3zm0 8v-3h16v3H4z" />
                    </svg>
                </button>
            </div>
        </div>
    );
});

export default ModelViewer;
