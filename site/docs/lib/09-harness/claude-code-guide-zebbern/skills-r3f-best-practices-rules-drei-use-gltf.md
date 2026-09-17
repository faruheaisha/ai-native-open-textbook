---
title: "drei-use-gltf"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/r3f-best-practices/rules/drei-use-gltf.md"
sourceRel: "skills/r3f-best-practices/rules/drei-use-gltf.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/r3f-best-practices/rules/drei-use-gltf.md"
sourceSha256: "04034b4c88ff94b4230a4da70069abddcc01d116ff80031263a905046ff3c41d"
pageSha256: "04034b4c88ff94b4230a4da70069abddcc01d116ff80031263a905046ff3c41d"
contentMode: "local-full"
zh: ""
---

# drei-use-gltf

**Use useGLTF for model loading with preloading.**

## Why It Matters

`useGLTF` from Drei provides:
- Suspense integration (automatic loading states)
- Caching (same model loaded once)
- Preloading capability
- Draco decompression support

## Basic Example

```jsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene, nodes, materials } = useGLTF('/model.glb');
  return <primitive object={scene} />;
}
```

## Preloading (Critical for UX)

```jsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} />;
}

// Preload at module level - starts loading immediately
useGLTF.preload('/model.glb');

// Or preload multiple models
useGLTF.preload(['/model1.glb', '/model2.glb', '/model3.glb']);
```

## With Draco Compression

```jsx
function DracoModel() {
  // Second argument is the Draco decoder path
  const { scene } = useGLTF('/model.glb', '/draco/');
  return <primitive object={scene} />;
}

useGLTF.preload('/model.glb', '/draco/');
```

## Accessing Nodes and Materials

```jsx
function Character() {
  const { nodes, materials } = useGLTF('/character.glb');

  return (
    <group>
      <mesh
        geometry={nodes.Body.geometry}
        material={materials.Skin}
      />
      <mesh
        geometry={nodes.Clothes.geometry}
        material={materials.Fabric}
      />
    </group>
  );
}
```

## Clone for Multiple Instances

```jsx
function Tree({ position }) {
  const { scene } = useGLTF('/tree.glb');

  // Clone to avoid sharing state between instances
  return <primitive object={scene.clone()} position={position} />;
}

function Forest() {
  return (
    <>
    </>
  );
}
```

## With Suspense

```jsx
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} />;
}

function Scene() {
  return (
    <Suspense fallback={<LoadingBox />}>
  );
}

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial wireframe color="white" />
    </mesh>
  );
}
```

## TypeScript Types

```tsx
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.Mesh;
    Head: THREE.Mesh;
  };
  materials: {
    Skin: THREE.MeshStandardMaterial;
  };
};

function Model() {
  const { nodes, materials } = useGLTF('/model.glb') as GLTFResult;
  // Now nodes.Body and materials.Skin are typed
}
```

## Dispose Handling

R3F auto-disposes by default. To prevent disposal (for shared models):

```jsx
function SharedModel({ model }) {
  return <primitive object={model} dispose={null} />;
}
```

## References

- [Drei useGLTF](https://github.com/pmndrs/drei#usegltf)
- [gltfjsx](https://github.com/pmndrs/gltfjsx) - Generate JSX from GLTF
