import {
  Bodies as MatterBodies,
  Body as MatterBody,
  Vector as MatterVector,
} from "matter-js";
import { clamp } from "lodash";

import type {
  Engine as MatterEngine,
  IEventCollision as IMatterEventCollision,
} from "matter-js";

const GRAVITY = 9.81;
const CAR_MASS = 1500.0;
const CAR_LENGTH = 4.0;
const CAR_CG_TO_REAR_AXLE_LENGTH = 1.25;
const CAR_CG_TO_FRONT_AXLE_LENGTH = 1.25;
const CAR_WHEEL_BASE_LENGTH =
  CAR_CG_TO_REAR_AXLE_LENGTH + CAR_CG_TO_FRONT_AXLE_LENGTH;
const CAR_AXLE_WEIGHT_RATIO_FRONT =
  CAR_CG_TO_REAR_AXLE_LENGTH / CAR_WHEEL_BASE_LENGTH;
const CAR_AXLE_WEIGHT_RATIO_REAR =
  CAR_CG_TO_FRONT_AXLE_LENGTH / CAR_WHEEL_BASE_LENGTH;
const CAR_CG_HEIGHT = 0.55;
const CAR_ENGINE_FORCE = 20000.0;
const CAR_BRAKE_FORCE = 8000.0;
const CAR_REVERSE_MULTIPLIER = 0.5;
const CAR_TIRE_GRIP = 1.5;
const CAR_MAX_STEER = 0.5;
const CAR_WEIGHT_TRANSFER = 1;
const CAR_CORNER_STIFFNESS_FRONT = 0.2;
const CAR_CORNER_STIFFNESS_REAR = 0.25;
const CAR_AIR_RESISTANCE = 15;
const CAR_ROLLING_RESISTANCE = 100 * CAR_AIR_RESISTANCE;
const CAR_MAGIC_MODIFIER = 1;

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Vector
const clampVectorMagnitude = (vec: MatterVector, max: number): MatterVector =>
  MatterVector.mult(
    MatterVector.normalise(vec),
    clamp(MatterVector.magnitude(vec), 0, max)
  );

interface PlayerState {
  readonly player: MatterBody | null;
  readonly currentForce: MatterVector;
  readonly gripModifier: number;
}

const initPlayerState = (): PlayerState => ({
  player: null,
  currentForce: { x: 0, y: 0 },
  gripModifier: 1,
});

const createPlayer = (): MatterBody =>
  MatterBodies.rectangle(0, 100, 20, CAR_LENGTH * 10, {
    label: "player",
    mass: CAR_MASS,
    chamfer: { radius: 5 },
    frictionAir: 0,
    render: {
      // Pastel Red
      fillStyle: "#FF6961",
    },
  });

const updatePlayer = (
  lastDelta: number,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Body
  playerState: PlayerState,
  controls: {
    readonly isForward: boolean;
    readonly isReverse: boolean;
    readonly isBrake: boolean;
    readonly steering: number;
  }
): PlayerState => {
  const { player } = playerState;
  if (player === null) {
    return playerState;
  }

  const orientationPlayer = { x: 0, y: -1 };
  const velocityPlayer = MatterVector.rotate(player.velocity, -player.angle);
  const angularVelocityPlayer = player.angularVelocity;

  // Grip and weight shift
  const tireGripFront = CAR_TIRE_GRIP * playerState.gripModifier;
  const tireGripRear = CAR_TIRE_GRIP * playerState.gripModifier;
  const axleWeightFront =
    CAR_AXLE_WEIGHT_RATIO_FRONT * player.mass * GRAVITY -
    CAR_WEIGHT_TRANSFER *
      (CAR_CG_HEIGHT / CAR_LENGTH) *
      playerState.currentForce.y;
  const axleWeightRear =
    CAR_AXLE_WEIGHT_RATIO_REAR * player.mass * GRAVITY +
    CAR_WEIGHT_TRANSFER *
      (CAR_CG_HEIGHT / CAR_LENGTH) *
      playerState.currentForce.y;

  // Traction and braking
  const engineForce = CAR_ENGINE_FORCE * clamp(player.speed / 10, 0.25, 1);
  const tractionForcePlayer = clampVectorMagnitude(
    controls.isForward
      ? MatterVector.mult(orientationPlayer, engineForce)
      : controls.isReverse
      ? MatterVector.mult(
          MatterVector.neg(orientationPlayer),
          engineForce * CAR_REVERSE_MULTIPLIER
        )
      : { x: 0, y: 0 },
    axleWeightRear * tireGripRear
  );
  const brakingForcePlayer = clampVectorMagnitude(
    controls.isBrake && velocityPlayer.y < 0
      ? MatterVector.mult(MatterVector.neg(orientationPlayer), CAR_BRAKE_FORCE)
      : { x: 0, y: 0 },
    (axleWeightRear * tireGripRear + axleWeightFront * tireGripRear) / 2
  );

  // Drag and resistance
  const dragForcePlayer = MatterVector.mult(
    velocityPlayer,
    -CAR_AIR_RESISTANCE * MatterVector.magnitude(velocityPlayer)
  );
  const rollingResistanceForcePlayer = MatterVector.mult(
    velocityPlayer,
    -CAR_ROLLING_RESISTANCE
  );

  const longForcePlayer = MatterVector.add(
    MatterVector.add(tractionForcePlayer, brakingForcePlayer),
    MatterVector.add(dragForcePlayer, rollingResistanceForcePlayer)
  );

  // Steering
  const steeringAngle = CAR_MAX_STEER * controls.steering;

  const yawSpeedFront = CAR_CG_TO_FRONT_AXLE_LENGTH * angularVelocityPlayer;
  const yawSpeedRear = -CAR_CG_TO_REAR_AXLE_LENGTH * angularVelocityPlayer;
  const slipAngleFront =
    Math.atan2(velocityPlayer.x + yawSpeedFront, Math.abs(velocityPlayer.y)) -
    steeringAngle * Math.sign(velocityPlayer.y);
  const slipAngleRear = Math.atan2(
    velocityPlayer.x - yawSpeedRear,
    Math.abs(velocityPlayer.y)
  );
  const frictionForcePlayerFront = clampVectorMagnitude(
    MatterVector.mult(
      MatterVector.mult(
        MatterVector.perp(orientationPlayer),
        -CAR_CORNER_STIFFNESS_FRONT * slipAngleFront
      ),
      axleWeightFront
    ),
    axleWeightFront * tireGripFront
  );
  const frictionForcePlayerRear = clampVectorMagnitude(
    MatterVector.mult(
      MatterVector.mult(
        MatterVector.perp(orientationPlayer),
        -CAR_CORNER_STIFFNESS_REAR * slipAngleRear
      ),
      axleWeightRear
    ),
    axleWeightRear * tireGripRear
  );

  const latForcePlayer = MatterVector.add(
    frictionForcePlayerRear,
    MatterVector.mult(frictionForcePlayerFront, Math.cos(steeringAngle))
  );

  let newForcePlayer = MatterVector.add(longForcePlayer, latForcePlayer);

  const accelerationPlayer = MatterVector.div(newForcePlayer, player.mass);
  const velocityDeltaPlayer = MatterVector.mult(accelerationPlayer, lastDelta);
  MatterBody.setVelocity(
    player,
    MatterVector.add(
      player.velocity,
      MatterVector.rotate(velocityDeltaPlayer, player.angle)
    )
  );

  const angularTorque =
    -frictionForcePlayerRear.x * CAR_CG_TO_REAR_AXLE_LENGTH +
    Math.cos(steeringAngle) *
      frictionForcePlayerFront.x *
      CAR_CG_TO_FRONT_AXLE_LENGTH;
  let newAngularAccelerationPlayer =
    -angularTorque / (CAR_MAGIC_MODIFIER * player.inertia);
  MatterBody.setAngularVelocity(
    player,
    newAngularAccelerationPlayer * lastDelta
  );

  if (
    MatterVector.magnitude(velocityPlayer) < 1e-1 &&
    MatterVector.magnitude(velocityDeltaPlayer) < 1e-2
  ) {
    newForcePlayer = { x: 0, y: 0 };
    MatterBody.setVelocity(player, { x: 0, y: 0 });
    newAngularAccelerationPlayer = 0;
    MatterBody.setAngularVelocity(player, 0);
  }

  return {
    ...playerState,
    currentForce: newForcePlayer,
  };
};

const getPlayerCollisionLabels = (
  event: IMatterEventCollision<MatterEngine>
): string[] =>
  event.pairs.flatMap((pair) =>
    pair.bodyA.label === "player"
      ? [pair.bodyB.label]
      : pair.bodyB.label === "player"
      ? [pair.bodyA.label]
      : []
  );

const handlePlayerCollisionStart = (
  playerState: PlayerState,
  event: IMatterEventCollision<MatterEngine>
): PlayerState => {
  const newPlayerState = { ...playerState, gripModifier: 1 };
  const collisionLabels = getPlayerCollisionLabels(event);
  if (collisionLabels.some((label) => label.endsWith("-sand"))) {
    newPlayerState.gripModifier = 0.25;
  }
  return newPlayerState;
};

const handlePlayerCollisionEnd = (
  playerState: PlayerState,
  event: IMatterEventCollision<MatterEngine>
): PlayerState => {
  const newPlayerState = { ...playerState, gripModifier: 1 };
  const collisionLabels = getPlayerCollisionLabels(event);
  if (collisionLabels.some((label) => label.endsWith("-sand"))) {
    newPlayerState.gripModifier = 1;
  }
  return newPlayerState;
};

export {
  initPlayerState,
  createPlayer,
  updatePlayer,
  handlePlayerCollisionStart,
  handlePlayerCollisionEnd,
};
