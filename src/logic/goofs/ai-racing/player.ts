import {
  Bodies as MatterBodies,
  Body as MatterBody,
  Vector as MatterVector,
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
const CAR_BRAKE_FORCE = 12000.0;
const CAR_TIRE_GRIP = 2.5;
const CAR_MAX_STEER = 0.4;
const CAR_WEIGHT_TRANSFER = 0.8;
const CAR_CORNER_STIFFNESS_FRONT = 0.45;
const CAR_CORNER_STIFFNESS_REAR = 0.4;
const CAR_AIR_RESISTANCE = 15;
const CAR_ROLLING_RESISTANCE = 100 * CAR_AIR_RESISTANCE;

const clamp = (x: number, min: number, max: number): number =>
  Math.min(max, Math.max(x, min));
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Vector
const clampVectorMagnitude = (vec: MatterVector, max: number): MatterVector =>
  MatterVector.mult(
    MatterVector.normalise(vec),
    clamp(MatterVector.magnitude(vec), 0, max)
  );

const createPlayer = (): MatterBody =>
  MatterBodies.rectangle(100, 500, 20, CAR_LENGTH * 10, {
    label: "player",
    frictionAir: 0,
    mass: CAR_MASS,
  });

const updatePlayer = (
  lastDelta: number,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Body
  player: MatterBody,
  controls: {
    readonly isGas: boolean;
    readonly isBrake: boolean;
    readonly steering: number;
  },
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Matter.Vector
  forcePlayer: MatterVector
): MatterVector => {
  const orientationPlayer = { x: 0, y: -1 };
  const velocityPlayer = MatterVector.rotate(player.velocity, -player.angle);
  const angularVelocityPlayer = player.angularVelocity;

  // Grip and weight shift
  const tireGripFront = CAR_TIRE_GRIP;
  const tireGripRear = CAR_TIRE_GRIP;
  const axleWeightFront =
    CAR_AXLE_WEIGHT_RATIO_FRONT * player.mass * GRAVITY -
    CAR_WEIGHT_TRANSFER * (CAR_CG_HEIGHT / CAR_LENGTH) * forcePlayer.y;
  const axleWeightRear =
    CAR_AXLE_WEIGHT_RATIO_REAR * player.mass * GRAVITY +
    CAR_WEIGHT_TRANSFER * (CAR_CG_HEIGHT / CAR_LENGTH) * forcePlayer.y;

  // Traction and braking
  const tractionForcePlayer = clampVectorMagnitude(
    controls.isGas
      ? MatterVector.mult(orientationPlayer, CAR_ENGINE_FORCE)
      : { x: 0, y: 0 },
    axleWeightRear * tireGripRear
  );
  console.log(tractionForcePlayer);
  const brakingForcePlayer =
    controls.isBrake && velocityPlayer.y < 0
      ? MatterVector.mult(MatterVector.neg(orientationPlayer), CAR_BRAKE_FORCE)
      : { x: 0, y: 0 };

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
  const frictionForcePlayerFront = MatterVector.mult(
    clampVectorMagnitude(
      MatterVector.mult(
        MatterVector.perp(orientationPlayer),
        -CAR_CORNER_STIFFNESS_FRONT * slipAngleFront
      ),
      tireGripFront
    ),
    axleWeightFront
  );
  const frictionForcePlayerRear = MatterVector.mult(
    clampVectorMagnitude(
      MatterVector.mult(
        MatterVector.perp(orientationPlayer),
        -CAR_CORNER_STIFFNESS_REAR * slipAngleRear
      ),
      tireGripRear
    ),
    axleWeightRear
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
  let newAngularAccelerationPlayer = -angularTorque / player.inertia;
  MatterBody.setAngularVelocity(
    player,
    newAngularAccelerationPlayer * lastDelta
  );

  if (MatterVector.magnitude(velocityPlayer) < 0.1 && !controls.isGas) {
    newForcePlayer = { x: 0, y: 0 };
    MatterBody.setVelocity(player, { x: 0, y: 0 });
    newAngularAccelerationPlayer = 0;
    MatterBody.setAngularVelocity(player, 0);
  }

  return newForcePlayer;
};

export { createPlayer, updatePlayer };
