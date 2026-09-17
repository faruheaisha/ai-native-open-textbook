---
title: "perf-never-set-state-in-useframe"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/r3f-best-practices/rules/perf-never-set-state-in-useframe.md"
sourceRel: "skills/r3f-best-practices/rules/perf-never-set-state-in-useframe.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/r3f-best-practices/rules/perf-never-set-state-in-useframe.md"
sourceSha256: "132544db12b45c74d802977d56b2bda3dface91d326bb0148cd18bae8fdea444"
pageSha256: "132544db12b45c74d802977d56b2bda3dface91d326bb0148cd18bae8fdea444"
contentMode: "local-full"
zh: ""
---

# perf-never-set-state-in-useframe

**NEVER call setState inside useFrame.**

## Why It Matters

This is the #1 performance killer in R3F. Calling setState triggers React re-renders. useFrame runs at 60fps. setState in useFrame = 60 re-renders per second = destroyed performance.

## Bad Example

```jsx
// BAD - Causes 60 re-renders per second!
function BadComponent() {
  const [position, setPosition] = useState(0);

  useFrame(() => {
    setPosition(p => p + 0.01); // NEVER DO THIS
  });

  return <mesh position-x={position} />;
}
```

This triggers React reconciliation 60 times per second, causing:
- Massive CPU usage
- Frame drops
- Component re-creation
- Garbage collection pauses

## Good Example

```jsx
// GOOD - Mutate refs directly, no re-renders
function GoodComponent() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.position.x += 0.01;
  });

  return <mesh ref={meshRef} />;
}
```

The ref gives direct access to the Three.js object. Mutating it doesn't trigger React.

## With Delta Time

```jsx
function AnimatedComponent() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += 1 * delta; // 1 rad/sec
    meshRef.current.position.x = Math.sin(state.clock.elapsedTime);
  });

  return <mesh ref={meshRef} />;
}
```

## Multiple Values

```jsx
function ComplexAnimation() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    meshRef.current.position.set(
      Math.sin(t) * 2,
      Math.cos(t * 2),
      Math.sin(t * 0.5)
    );
    meshRef.current.rotation.set(t, t * 0.5, 0);
  });

  return <mesh ref={meshRef} />;
}
```

## Using Zustand Without Re-renders

```jsx
function ZustandAnimation() {
  const meshRef = useRef();

  useFrame(() => {
    // getState() doesn't trigger re-renders
    const { targetPosition } = useStore.getState();
    meshRef.current.position.lerp(targetPosition, 0.1);
  });

  return <mesh ref={meshRef} />;
}
```

## When You NEED State

If you genuinely need React state (e.g., for UI updates), isolate it:

```jsx
// Keep animated mesh separate
function AnimatedMesh() {
  const meshRef = useRef();
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta;
  });
  return <mesh ref={meshRef} />;
}

// State changes here won't affect AnimatedMesh
function UI() {
  const [score, setScore] = useState(0);
  return <Html><div>{score}</div></Html>;
}

function Scene() {
  return (
    <>
    </>
  );
}
```

## References

- [R3F Performance Pitfalls](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls)
