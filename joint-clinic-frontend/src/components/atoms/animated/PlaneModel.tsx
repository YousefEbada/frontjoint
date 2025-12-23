import React from "react";

export function PlaneModel(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color="#ccc" />
    </mesh>
  );
}
