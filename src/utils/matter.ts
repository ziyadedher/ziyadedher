import { Engine, Render, Runner } from "matter-js";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Matter {
  readonly engine: Engine;
  readonly render: Render;
  readonly runner: Runner;
}

const useMatter = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- HTMLElement
  canvas: HTMLElement,
  {
    width,
    height,
    isDebug = false,
    isWireframe = isDebug,
  }: {
    readonly width?: number;
    readonly height?: number;
    readonly isDebug?: boolean;
    readonly isWireframe?: boolean;
  } = {}
): Matter | null => {
  // This keeps track of what elements we've rendered a "canvas" in to avoid re-rendering.
  const [matters, setMatters] = useState<ReadonlyMap<HTMLElement, Matter>>(
    new Map()
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
    const createRenderer = (engine: Engine): Render =>
      Render.create({
        element: canvas,
        engine,
        options: {
          wireframes: isWireframe,
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
          width,
          height,
        },
      });

    const matter = matters.get(canvas) ?? null;
    if (matter !== null) {
      const newMatters = new Map(matters);
      newMatters["delete"](canvas);

      Render.stop(matter.render);
    }
    Runner.create();
    Engine.create({
      positionIterations: 12,
      velocityIterations: 8,
      gravity: { x: 0, y: 0 },
    });
  }, [canvas, width, height, isDebug, isWireframe]);

  return matters.get(canvas) ?? null;
};

export type { Matter };
export { useMatter };
