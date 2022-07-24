import { Bodies as MatterBodies } from "matter-js";

import type { Body as MatterBody } from "matter-js";

const createWorld = (): MatterBody[] => {
  const boxA = MatterBodies.rectangle(400, 200, 80, 80, {
    frictionAir: 0.1,
  });
  const boxB = MatterBodies.rectangle(450, 50, 80, 80, {
    frictionAir: 0.1,
  });
  const carA = MatterBodies.rectangle(450, 560, 40, 20, {
    frictionAir: 0.1,
  });
  const carB = MatterBodies.rectangle(600, 560, 40, 20, {
    frictionAir: 0.1,
  });
  const ground = MatterBodies.rectangle(400, 600, 800, 50, {
    isStatic: true,
  });

  const leftWall = MatterBodies.rectangle(25, 75, 50, 1000, {
    isStatic: true,
  });
  const rightWall = MatterBodies.rectangle(775, 75, 50, 1000, {
    isStatic: true,
  });

  return [boxA, boxB, carA, carB, ground, leftWall, rightWall];
};

export { createWorld };
