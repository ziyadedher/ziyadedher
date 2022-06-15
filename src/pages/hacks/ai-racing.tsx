import {
  Bodies as MatterBodies,
  Body as MatterBody,
  Composite as MatterComposite,
  Events as MatterEvents,
  Render as MatterRender,
  Runner as MatterRunner,
  Vector as MatterVector,
} from "matter-js";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import PageContainer, { PageStyle } from "../../components/page_container";
import { useMatter } from "../../utils/matter";

import type { NextPage } from "next";

const GRAVITY = 9.81;
const CAR_MASS = 2;
const CAR_LENGTH = 40;
const CAR_CG_TO_REAR_AXLE_LENGTH = 10;
const CAR_CG_TO_FRONT_AXLE_LENGTH = 10;
const CAR_WHEEL_BASE_LENGTH =
  CAR_CG_TO_REAR_AXLE_LENGTH + CAR_CG_TO_FRONT_AXLE_LENGTH;
const CAR_AXLE_WEIGHT_RATIO_FRONT =
  CAR_CG_TO_REAR_AXLE_LENGTH / CAR_WHEEL_BASE_LENGTH;
const CAR_AXLE_WEIGHT_RATIO_REAR =
  CAR_CG_TO_FRONT_AXLE_LENGTH / CAR_WHEEL_BASE_LENGTH;
const CAR_CG_HEIGHT = 0.55;
const CAR_ENGINE_FORCE = 8000;
const CAR_BRAKE_FORCE = 12000;
const CAR_EBRAKE_FORCE = CAR_BRAKE_FORCE / 2.5;
const CAR_TIRE_GRIP = 2.0;
const CAR_LOCK_GRIP = 0.7;
const CAR_MAX_STEER = 0.6;
const CAR_WEIGHT_TRANSFER = 0.2;
const CAR_CORNER_STIFFNESS_FRONT = 5.0;
const CAR_CORNER_STIFFNESS_REAR = 5.2;
const CAR_AIR_RESISTANCE = 2.5;
const CAR_ROLLING_RESISTANCE = 8.0;

const Game: React.FunctionComponent = () => {
  const matter = useMatter({ isDebug: true });
  const keysDown = useRef(new Set<string>());
  const accelerationPlayer = useRef({ x: 0, y: 0 });
  const velocityPlayer = useRef({ x: 0, y: 0 });
  const angularAccelerationPlayer = useRef(0);
  const angularVelocityPlayer = useRef(0);

  useEffect(() => {
    if (matter.render === null) {
      return;
    }

    const boxA = MatterBodies.rectangle(400, 200, 80, 80);
    const boxB = MatterBodies.rectangle(450, 50, 80, 80);
    const ground = MatterBodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });
    MatterComposite.add(matter.engine.world, [boxA, boxB, ground]);

    const player = MatterBodies.rectangle(300, 200, 20, CAR_LENGTH, {
      angle: 0.25 * Math.PI,
      label: "player",
      mass: CAR_MASS,
      isStatic: true,
    });
    MatterComposite.add(matter.engine.world, [player]);

    MatterEvents.on(matter.engine, "beforeUpdate", () => {
      const lastDelta = matter.engine.timing.lastDelta * 1e-3;
      const forwardPlayer = { x: 0, y: -1 };

      let steerAngle = 0;
      let tractionForcePlayer = { x: 0, y: 0 };
      new Set(keysDown.current).forEach((k) => {
        switch (k) {
          case "ArrowLeft":
            steerAngle -= CAR_MAX_STEER;
            break;
          case "ArrowRight":
            steerAngle += CAR_MAX_STEER;
            break;
          case "ArrowUp":
            tractionForcePlayer = MatterVector.add(
              tractionForcePlayer,
              MatterVector.mult(forwardPlayer, CAR_ENGINE_FORCE)
            );
            break;
          case "ArrowDown":
            tractionForcePlayer = MatterVector.add(
              tractionForcePlayer,
              MatterVector.mult(
                MatterVector.neg(forwardPlayer),
                CAR_BRAKE_FORCE
              )
            );
            break;
          default:
        }
      });

      const dragForcePlayer = {
        x:
          -CAR_AIR_RESISTANCE *
          velocityPlayer.current.x *
          Math.abs(velocityPlayer.current.x),
        y:
          -CAR_AIR_RESISTANCE *
          velocityPlayer.current.y *
          Math.abs(velocityPlayer.current.y),
      };
      const rollingResistanceForcePlayer = {
        x: -CAR_ROLLING_RESISTANCE * velocityPlayer.current.x,
        y: -CAR_ROLLING_RESISTANCE * velocityPlayer.current.y,
      };

      const tireGripFront = CAR_TIRE_GRIP;
      const tireGripRear = CAR_TIRE_GRIP;
      const yawSpeedFront =
        CAR_CG_TO_FRONT_AXLE_LENGTH * angularVelocityPlayer.current;
      const yawSpeedRear =
        -CAR_CG_TO_REAR_AXLE_LENGTH * angularVelocityPlayer.current;
      const slipAngleFront =
        Math.atan2(
          velocityPlayer.current.x + yawSpeedFront,
          Math.abs(velocityPlayer.current.y)
        ) -
        steerAngle * Math.sign(-velocityPlayer.current.y);
      const slipAngleRear = Math.atan2(
        velocityPlayer.current.x + yawSpeedRear,
        Math.abs(velocityPlayer.current.y)
      );
      const axleWeightFront =
        CAR_MASS *
        (CAR_AXLE_WEIGHT_RATIO_FRONT * GRAVITY -
          CAR_WEIGHT_TRANSFER *
            accelerationPlayer.current.y *
            (CAR_CG_HEIGHT / CAR_WHEEL_BASE_LENGTH));
      const axleWeightRear =
        CAR_MASS *
        (CAR_AXLE_WEIGHT_RATIO_REAR * GRAVITY +
          CAR_WEIGHT_TRANSFER *
            accelerationPlayer.current.y *
            (CAR_CG_HEIGHT / CAR_WHEEL_BASE_LENGTH));
      const frictionForceFrontPlayerX =
        Math.max(
          -tireGripFront,
          Math.min(-CAR_CORNER_STIFFNESS_FRONT * slipAngleFront, tireGripFront)
        ) * axleWeightFront;
      const frictionForceRearPlayerX =
        Math.max(
          -tireGripRear,
          Math.min(-CAR_CORNER_STIFFNESS_REAR * slipAngleRear, tireGripRear)
        ) * axleWeightRear;

      const totalForcePlayer = {
        x:
          tractionForcePlayer.x +
          dragForcePlayer.x +
          rollingResistanceForcePlayer.x +
          Math.cos(steerAngle) * frictionForceFrontPlayerX +
          frictionForceRearPlayerX,
        y:
          tractionForcePlayer.y +
          dragForcePlayer.y +
          rollingResistanceForcePlayer.y,
      };

      accelerationPlayer.current = MatterVector.div(totalForcePlayer, CAR_MASS);
      velocityPlayer.current = MatterVector.add(
        velocityPlayer.current,
        MatterVector.mult(accelerationPlayer.current, lastDelta)
      );

      let angularTorque =
        (frictionForceFrontPlayerX + tractionForcePlayer.x) *
          CAR_CG_TO_FRONT_AXLE_LENGTH -
        frictionForceRearPlayerX * CAR_CG_TO_REAR_AXLE_LENGTH;

      if (
        MatterVector.magnitude(velocityPlayer.current) < 1e-2 &&
        MatterVector.magnitude(tractionForcePlayer) < 1e-2
      ) {
        velocityPlayer.current = { x: 0, y: 0 };
        angularTorque = 0;
      }

      angularAccelerationPlayer.current = angularTorque / CAR_MASS;
      angularVelocityPlayer.current +=
        angularAccelerationPlayer.current * lastDelta;

      MatterBody.translate(
        player,
        MatterVector.rotate(
          MatterVector.mult(velocityPlayer.current, lastDelta),
          player.angle
        )
      );
      MatterBody.rotate(player, angularVelocityPlayer.current * lastDelta);

      console.log("tractionForcePlayer: ", tractionForcePlayer);
      console.log("dragForcePlayer: ", dragForcePlayer);
      console.log(
        "rollingResistanceForcePlayer: ",
        rollingResistanceForcePlayer
      );
      console.log("slipAngleFront: ", slipAngleFront);
      console.log("slipAngleRear: ", slipAngleRear);
      console.log("frictionForceFrontPlayerX: ", frictionForceFrontPlayerX);
      console.log("frictionForceRearPlayerX: ", frictionForceRearPlayerX);
      console.log("Math.cos(steerAngle): ", Math.cos(steerAngle));
      console.log("totalForcePlayer: ", totalForcePlayer);
      console.log("angularTorque: ", angularTorque);
      console.log("angularAcceleration: ", angularAccelerationPlayer.current);
      console.log("angularVelocity: ", angularVelocityPlayer.current);
    });

    MatterRender.run(matter.render);
    MatterRunner.run(matter.runner, matter.engine);
  }, [matter]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.KeyboardEvent
    document.addEventListener("keydown", (e) => {
      keysDown.current.add(e.key);
    });
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.KeyboardEvent
    document.addEventListener("keyup", (e) => {
      keysDown.current["delete"](e.key);
    });
  }, []);

  return (
    <div ref={matter.canvasRef} className="h-full w-full">
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
