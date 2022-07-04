import {
  Bodies as MatterBodies,
  Composite as MatterComposite,
  Events as MatterEvents,
  Render as MatterRender,
  Runner as MatterRunner,
} from "matter-js";
import Head from "next/head";
import React, { useEffect, useRef } from "react";

import PageContainer, { PageStyle } from "../../components/page_container";
import { createPlayer, updatePlayer } from "../../logic/goofs/ai-racing/player";
import { useMatter } from "../../utils/matter";
import { useWindowDimensions } from "../../utils/window";

import type { NextPage } from "next";

const Game: React.FunctionComponent = () => {
  const windowDimensions = useWindowDimensions();
  const canvasRef = useRef<HTMLDivElement>(null);

  const matter = useMatter(
    canvasRef.current,
    {
      width: windowDimensions?.width,
      height: windowDimensions?.height,
      isDebug: false,
      isWireframe: true,
    },
    (matter) => {}
  );
  const keysDown = useRef(new Set<string>());

  const forcePlayer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (matter.render === null) {
      return;
    }

    const boxA = MatterBodies.rectangle(400, 200, 80, 80, {
      frictionAir: 0.1,
    });
    const boxB = MatterBodies.rectangle(450, 50, 80, 80);
    const carA = MatterBodies.rectangle(450, 570, 40, 20);
    const carB = MatterBodies.rectangle(600, 570, 40, 20);
    const ground = MatterBodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });
    MatterComposite.add(matter.engine.world, [boxA, boxB, carA, carB, ground]);

    const player = createPlayer();
    MatterComposite.add(matter.engine.world, [player]);

    MatterEvents.on(matter.engine, "beforeUpdate", () => {
      let steering = 0;
      let isBrake = false;
      let isGas = false;
      new Set(keysDown.current).forEach((k) => {
        switch (k) {
          case "ArrowLeft":
            steering -= 1;
            break;
          case "ArrowRight":
            steering += 1;
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

      forcePlayer.current = updatePlayer(
        matter.engine.timing.lastDelta * 0.001,
        player,
        {
          isGas,
          isBrake,
          steering,
        },
        forcePlayer.current
      );
    });

    MatterEvents.on(matter.engine, "afterUpdate", () => {
      if (matter.render !== null) {
        MatterRender.lookAt(matter.render, [player], { x: 300, y: 300 }, true);
      }
    });

    MatterRender.run(matter.render);
    MatterRunner.run(matter.runner, matter.engine);
  }, [matter]);

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
    <div ref={canvasRef} className="h-full w-full">
      {matter.render === null ? <p>Loading...</p> : null}
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
