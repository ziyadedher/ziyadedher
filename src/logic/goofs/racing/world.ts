import { createPlayer } from "./player";
import { createLevelTest } from "./levels";

import type { Body as MatterBody } from "matter-js";

interface World {
  player: MatterBody;
  level: MatterBody[];
}

const createWorld = (): World => ({
  level: createLevelTest(),
  player: createPlayer(),
});

export { createWorld };
