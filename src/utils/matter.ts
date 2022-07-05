import { Engine, Render, Runner } from "matter-js";
import { useCallback, useEffect, useState } from "react";

import type React from "react";

interface Matter {
  readonly engine: Engine;
  readonly render: Render;
  readonly runner: Runner;
}

interface RenderOptions {
  readonly windowDimensions: {
    readonly width: number;
    readonly height: number;
  } | null;
  readonly isDebug?: boolean;
  readonly isWireframe?: boolean;
}

const useMatter = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
  setupWorld: (engine: Engine) => void,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- HTMLCanvasElement
  renderCanvas: React.RefObject<HTMLCanvasElement>,
  renderOptions: RenderOptions
): Matter | null => {
  const createEngine = useCallback(() => {
    const engine = Engine.create({
      positionIterations: 12,
      velocityIterations: 8,
      gravity: { x: 0, y: 0 },
    });
    setupWorld(engine);
    return engine;
  }, [setupWorld]);

  const createRender = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- HTMLCanvasElement
      canvas: HTMLCanvasElement,
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
      engine: Engine,
      options: RenderOptions
    ): Render => {
      const render = Render.create({
        canvas,
        engine,
        options: {
          wireframes: options.isWireframe,
          showSleeping: options.isDebug,
          showDebug: options.isDebug,
          showBroadphase: options.isDebug,
          showBounds: options.isDebug,
          showVelocity: options.isDebug,
          showCollisions: options.isDebug,
          showSeparations: options.isDebug,
          showAxes: options.isDebug,
          showPositions: options.isDebug,
          showAngleIndicator: options.isDebug,
          showIds: options.isDebug,
          showVertexNumbers: options.isDebug,
          showConvexHulls: options.isDebug,
          showInternalEdges: options.isDebug,
          width: options.windowDimensions?.width,
          height: options.windowDimensions?.height,
        },
      });
      Render.run(render);
      return render;
    },
    []
  );

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
  const createRunner = useCallback((engine: Engine) => {
    const runner = Runner.create();
    Runner.run(runner, engine);
    return runner;
  }, []);

  const [matter, setMatter] = useState<Matter | null>(null);

  useEffect(() => {
    const canvas = renderCanvas.current;
    if (canvas === null) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter
    setMatter((curMatter) => {
      if (curMatter === null) {
        const engine = createEngine();
        return {
          engine,
          render: createRender(canvas, engine, renderOptions),
          runner: createRunner(engine),
        };
      }

      Render.stop(curMatter.render);
      return {
        engine: curMatter.engine,
        render: createRender(canvas, curMatter.engine, renderOptions),
        runner: curMatter.runner,
      };
    });
  }, [
    id,
    renderCanvas,
    renderOptions,
    createEngine,
    createRender,
    createRunner,
  ]);

  return matter;
};

export type { Matter };
export { useMatter };
