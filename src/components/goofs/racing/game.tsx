import { clamp } from "lodash";
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

import {
  handlePlayerCollisionEnd,
  handlePlayerCollisionStart,
  initPlayerState,
  updatePlayer,
} from "../../../logic/goofs/racing/player";
import { createWorld } from "../../../logic/goofs/racing/world";
import { useKeys } from "../../../utils/keys";
import { useMatter } from "../../../utils/matter";
import { useWindowDimensions } from "../../../utils/window";

import type { Body as MatterBody, Engine as MatterEngine } from "matter-js";

const Game: React.FunctionComponent = () => {
  const windowDimensions = useWindowDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [playerBody, setPlayerBody] = useState<MatterBody | null>(null);
  const [zoom, setZoom] = useState(1);

  const keys = useKeys();
  const keysRef = useRef(keys);
  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  const playerState = useRef(initPlayerState());
  const steering = useRef(0);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
  const setupWorld = useCallback((engine: MatterEngine) => {
    const { player, level } = createWorld();
    MatterComposite.add(engine.world, level);
    MatterComposite.add(engine.world, player);

    MatterEvents.on(engine, "beforeUpdate", () => {
      const lastDelta = engine.timing.lastDelta * 0.001;
      let steeringDelta = 0;
      let isForward = false;
      let isReverse = false;
      let isBrake = false;
      keysRef.current.forEach((k) => {
        switch (k) {
          case "ArrowLeft":
            steeringDelta -= 4 * lastDelta;
            break;
          case "ArrowRight":
            steeringDelta += 4 * lastDelta;
            break;
          case "ArrowUp":
            isForward = true;
            break;
          case "ArrowDown":
            isReverse = true;
            break;
          case "Space":
            isBrake = true;
            break;
          case "Minus":
            setZoom((value) => clamp(value - 0.01 * value ** 2, 0.5, 5));
            break;
          case "Equal":
            setZoom((value) => clamp(value + 0.01 * value ** 2, 0.5, 5));
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

      playerState.current = updatePlayer(lastDelta, playerState.current, {
        isForward,
        isReverse,
        isBrake,
        steering: steering.current,
      });
    });

    MatterEvents.on(engine, "collisionStart", (e) => {
      playerState.current = handlePlayerCollisionStart(playerState.current, e);
    });
    MatterEvents.on(engine, "collisionEnd", (e) => {
      playerState.current = handlePlayerCollisionEnd(playerState.current, e);
    });

    setPlayerBody(player);
  }, []);

  const renderOptions = useMemo(
    () => ({
      windowDimensions,
      isDebug: false,
      isWireframe: false,
    }),
    [windowDimensions]
  );
  const matter = useMatter("ai-racing", setupWorld, canvasRef, renderOptions);

  useEffect(() => {
    if (matter === null) {
      return;
    }

    if (playerBody !== null) {
      playerState.current = {
        ...playerState.current,
        player: playerBody,
      };
      MatterEvents.on(matter.engine, "afterUpdate", () => {
        MatterRender.lookAt(
          matter.render,
          [playerBody],
          { x: 500 / zoom, y: 500 / zoom },
          true
        );
      });
    }
  }, [matter, playerBody, zoom]);

  return (
    <div className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} />
      {matter === null ? <p>Loading...</p> : null}
    </div>
  );
};

export default Game;
