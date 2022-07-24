import {
  Composite as MatterComposite,
  Events as MatterEvents,
  Render as MatterRender,
} from "matter-js";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createPlayer, updatePlayer } from "../../../logic/goofs/racing/player";
import { createWorld } from "../../../logic/goofs/racing/world";
import { useKeys } from "../../../utils/keys";
import { useMatter } from "../../../utils/matter";
import { useWindowDimensions } from "../../../utils/window";

import type { Body as MatterBody, Engine as MatterEngine } from "matter-js";

const Game: React.FunctionComponent = () => {
  const windowDimensions = useWindowDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerBody, setPlayerBody] = useState<MatterBody | null>(null);

  const keys = useKeys();
  const keysRef = useRef(keys);
  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  const forcePlayer = useRef({ x: 0, y: 0 });
  const steering = useRef(0);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
  const setupWorld = useCallback((engine: MatterEngine) => {
    const world = createWorld();
    MatterComposite.add(engine.world, world);

    const player = createPlayer();
    MatterComposite.add(engine.world, [player]);

    MatterEvents.on(engine, "beforeUpdate", () => {
      const lastDelta = engine.timing.lastDelta * 0.001;
      let steeringDelta = 0;
      let isBrake = false;
      let isGas = false;
      keysRef.current.forEach((k) => {
        switch (k) {
          case "ArrowLeft":
            steeringDelta -= 4 * lastDelta;
            break;
          case "ArrowRight":
            steeringDelta += 4 * lastDelta;
            break;
          case "ArrowUp":
            isGas = true;
            break;
          case "ArrowDown":
            isBrake = true;
            break;
          case "Space":
            isBrake = true;
            break;
          default:
        }
      });

      if (steeringDelta === 0) {
        steering.current =
          Math.sign(steering.current) *
          Math.min(Math.abs(steering.current) - 0.01, 0);
      } else {
        steering.current = Math.min(
          1,
          Math.max(-1, steering.current + steeringDelta)
        );
      }

      forcePlayer.current = updatePlayer(
        lastDelta,
        player,
        {
          isGas,
          isBrake,
          steering: steering.current,
        },
        forcePlayer.current
      );
    });

    setPlayerBody(player);
  }, []);

  const renderOptions = useMemo(
    () => ({
      windowDimensions,
      isDebug: false,
      isWireframe: true,
    }),
    [windowDimensions]
  );
  const matter = useMatter("ai-racing", setupWorld, canvasRef, renderOptions);

  useEffect(() => {
    if (matter === null) {
      return;
    }

    if (playerBody !== null) {
      MatterEvents.on(matter.engine, "afterUpdate", () => {
        MatterRender.lookAt(
          matter.render,
          [playerBody],
          { x: 500, y: 500 },
          true
        );
      });
    }
  }, [matter, playerBody]);

  return (
    <div className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} />
      {matter === null ? <p>Loading...</p> : null}
    </div>
  );
};

export default Game;
