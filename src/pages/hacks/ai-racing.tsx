import {
  Bodies as MatterBodies,
  Composite as MatterComposite,
  Events as MatterEvents,
  Render as MatterRender,
} from "matter-js";
import Head from "next/head";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PageContainer, { PageStyle } from "../../components/page_container";
import { createPlayer, updatePlayer } from "../../logic/goofs/ai-racing/player";
import { useMatter } from "../../utils/matter";
import { useWindowDimensions } from "../../utils/window";

import type { Body as MatterBody, Engine as MatterEngine } from "matter-js";
import type { NextPage } from "next";

const Game: React.FunctionComponent = () => {
  const windowDimensions = useWindowDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerBody, setPlayerBody] = useState<MatterBody | null>(null);

  const keysDown = useRef(new Set<string>());
  const forcePlayer = useRef({ x: 0, y: 0 });
  const steering = useRef(0);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Engine
  const setupWorld = useCallback((engine: MatterEngine) => {
    const boxA = MatterBodies.rectangle(400, 200, 80, 80, {
      frictionAir: 0.1,
    });
    const boxB = MatterBodies.rectangle(450, 50, 80, 80);
    const carA = MatterBodies.rectangle(450, 570, 40, 20);
    const carB = MatterBodies.rectangle(600, 570, 40, 20);
    const ground = MatterBodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });
    MatterComposite.add(engine.world, [boxA, boxB, carA, carB, ground]);

    const player = createPlayer();
    MatterComposite.add(engine.world, [player]);

    MatterEvents.on(engine, "beforeUpdate", () => {
      const lastDelta = engine.timing.lastDelta * 0.001;
      let steeringDelta = 0;
      let isBrake = false;
      let isGas = false;
      new Set(keysDown.current).forEach((k) => {
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.KeyboardEvent
    document.addEventListener("keydown", (e) => {
      keysDown.current.add(e.code);
    });
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.KeyboardEvent
    document.addEventListener("keyup", (e) => {
      keysDown.current["delete"](e.code);
    });
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} />
      {matter === null ? <p>Loading...</p> : null}
    </div>
  );
};

const AIRacing: NextPage = () => (
  <>
    <Head>
      <title>AI Racer | Build AIs to race cars.</title>
      <meta
        name="description"
        content="Write scripts and AI controllers to drive and race cars. Upgrade your car with better components to make writing more powerful AIs feasible."
      />
    </Head>

    <PageContainer
      hasNavbar={false}
      hasHeader={false}
      navbarPage={null}
      pageStyle={PageStyle.HACKER}
    >
      <Game />
    </PageContainer>
  </>
);

export default AIRacing;
