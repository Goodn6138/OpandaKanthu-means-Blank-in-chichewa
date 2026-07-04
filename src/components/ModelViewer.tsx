'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geo) => {
      geo.computeVertexNormals();
      geo.center();
      setGeometry(geo);
    });
    return () => {
      if (geometry) geometry.dispose();
    };
  }, [url]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#F5F5F0"
        roughness={0.25}
        metalness={0.05}
      />
    </mesh>
  );
}

function Loading() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

export default function ModelViewer({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(10,10,10,0.95)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute',
        top: 24,
        right: 40,
        display: 'flex',
        gap: 16,
        zIndex: 10,
      }}>
        <a
          href={url}
          download="model.stl"
          style={{
            padding: '10px 24px',
            border: '1px solid #F5F5F0',
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Download STL
        </a>
        <button
          onClick={onClose}
          style={{ padding: '10px 24px', fontSize: 13 }}
        >
          Close
        </button>
      </div>

      <div style={{ width: '80vw', height: '70vh' }}>
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <Suspense fallback={<Loading />}>
            <Center>
              <Model url={url} />
            </Center>
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>

      <p style={{ marginTop: 16, opacity: 0.4, fontSize: 13 }}>
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}
