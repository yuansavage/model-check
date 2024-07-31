import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Torus } from "@react-three/drei";

const Loader = ({ position, error }) => {
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
export default Loader;
