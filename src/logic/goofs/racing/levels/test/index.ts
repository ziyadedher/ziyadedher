import { Body as MatterBody, Common as MatterCommon } from "matter-js";

import { constructBodyFromSvgString } from "../../utils/svg";

import barrierTestLevelSvgTxt from "!!raw-loader!./assets/barrier.svg";
import borderSandTestLevelSvgTxt from "!!raw-loader!./assets/border_sand.svg";
import borderWallsTestLevelSvgTxt from "!!raw-loader!./assets/border_walls.svg";

const createLevel = (): MatterBody[] => {
  MatterCommon.setDecomp(require("poly-decomp"));

  const borderWalls = constructBodyFromSvgString(
    borderWallsTestLevelSvgTxt as string,
    { resolution: 10 },
    { label: "border-walls", isStatic: true, render: { fillStyle: "#36454F" } }
  );
  MatterBody.scale(borderWalls, 10, 10);

  const borderSand = constructBodyFromSvgString(
    borderSandTestLevelSvgTxt as string,
    { resolution: 10 },
    {
      label: "border-sand",
      isSensor: true,
      isStatic: true,
      render: { fillStyle: "#F6D7B0" },
    }
  );
  MatterBody.scale(borderSand, 10, 10);

  const barrier = constructBodyFromSvgString(
    barrierTestLevelSvgTxt as string,
    { resolution: 1 },
    {
      label: "barrier-sand",
      isSensor: true,
      isStatic: true,
      render: { fillStyle: "#F6D7B0" },
    }
  );
  MatterBody.setPosition(barrier, { x: -200, y: 500 });
  MatterBody.scale(barrier, 5, 5);

  return [borderSand, borderWalls, barrier];
};

export { createLevel };
