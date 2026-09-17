---
title: "loading-suspense"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/r3f-best-practices/rules/loading-suspense.md"
sourceRel: "skills/r3f-best-practices/rules/loading-suspense.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/r3f-best-practices/rules/loading-suspense.md"
sourceSha256: "a31141fa040d867607f2b089f6da180adeb45a880ad1b0ed22a45b65a5fd8859"
pageSha256: "a31141fa040d867607f2b089f6da180adeb45a880ad1b0ed22a45b65a5fd8859"
contentMode: "local-full"
zh: ""
---

# loading-suspense

**Wrap async components in Suspense.**

## Why It Matters

R3F integrates with React Suspense for loading states. Components using `useGLTF`, `useTexture`, or other async loaders will suspend and need a Suspense boundary with a fallback.

## Basic Example

```jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} />;
}

function App() {
  return (
      <Suspense fallback={<LoadingFallback />}>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial wireframe color="white" />
    </mesh>
  );
}
```

## Multiple Async Components

```jsx
function Scene() {
  return (
    <Suspense fallback={<Loader />}>
  );
}
```

## Nested Suspense Boundaries

```jsx
function Scene() {
  return (
    <>
      {/* Environment loads first */}

      {/* Main content with visible loader */}
      <Suspense fallback={<Loader />}>

      {/* Background loads last, no blocking */}
    </>
  );
}
```

## Using useProgress

```jsx
import { useProgress, Html } from '@react-three/drei';

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
      <div className="loader">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>{progress.toFixed(0)}% loaded</p>
        <p className="loading-item">{item}</p>
      </div>
  );
}

function App() {
  return (
      <Suspense fallback={<Loader />}>
  );
}
```

## Error Boundaries

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ModelErrorFallback({ error, resetErrorBoundary }) {
  return (
      <div>
        <p>Failed to load model</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
  );
}

function SafeModel({ url }) {
  return (
    <ErrorBoundary
      FallbackComponent={ModelErrorFallback}
      onReset={() => {
        // Reset any state if needed
      }}
    >
      <Suspense fallback={<LoadingBox />}>
  );
}
```

## Preloading to Avoid Suspense

```jsx
import { useGLTF, useTexture } from '@react-three/drei';

// Preload at module level
useGLTF.preload('/model.glb');
useTexture.preload('/texture.png');

// Component won't suspend if already loaded
function Model() {
  const { scene } = useGLTF('/model.glb'); // Instant if preloaded
  return <primitive object={scene} />;
}
```

## Animated Fallback

```jsx
function AnimatedLoader() {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial wireframe color="cyan" />
    </mesh>
  );
}
```

## References

- [React Suspense](https://react.dev/reference/react/Suspense)
- [Drei useProgress](https://github.com/pmndrs/drei#useprogress)
