import { Engine, Render, Runner } from "matter-js";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseMatter {
  readonly engine: Engine;
  readonly render: Render | null;
  readonly runner: Runner;
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- HTMLElement
  readonly canvasRef: (newElement: HTMLElement | null) => void;
}

const useMatter = ({
  isDebug = false,
}: {
  readonly isDebug?: boolean;
} = {}): UseMatter => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const canvasRef = useCallback(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- HTMLElement
    (newElement: HTMLElement | null): void => {
      if (newElement !== null) {
        setElement(newElement);
      }
    },
    []
  );

  const engine = useMemo(() => Engine.create({ gravity: { x: 0, y: 0 } }), []);

  // This keeps track of what elements we've rendered a "canvas" in to avoid re-rendering.
  const [renders, setRenders] = useState<ReadonlyMap<HTMLElement, Render>>(
    new Map()
  );
  /**
   * Using `useState` and `useEffect` here because
   * 1. React Strict Mode causes multiple renders to happen for each component (to test for side-effects)
   * 2. When Render.create is called, it creates a "canvas" in the DOM
   * 3. `useMemo` will run immediately in the rendering loop
   * 4. `useEffect` will run after the rendering loop
   */
  const [render, setRender] = useState<Render | null>(null);
  useEffect(() => {
    if (element !== null) {
      const newRender =
        renders.get(element) ??
        Render.create({
          element,
          engine,
          options: {
            wireframes: isDebug,
            showSleeping: isDebug,
            showDebug: isDebug,
            showBroadphase: isDebug,
            showBounds: isDebug,
            showVelocity: isDebug,
            showCollisions: isDebug,
            showSeparations: isDebug,
            showAxes: isDebug,
            showPositions: isDebug,
            showAngleIndicator: isDebug,
            showIds: isDebug,
            showVertexNumbers: isDebug,
            showConvexHulls: isDebug,
            showInternalEdges: isDebug,
          },
        });
      if (!renders.has(element)) {
        setRenders(new Map(renders).set(element, newRender));
      }
      setRender(newRender);
    }
  }, [renders, element, engine, isDebug]);

  const runner = useMemo(() => Runner.create(), []);

  return {
    engine,
    render,
    runner,
    canvasRef,
  };
};

// eslint-disable-next-line import/prefer-default-export -- only export for now.
export { useMatter };
