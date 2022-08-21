import {
  Bodies as MatterBodies,
  Body as MatterBody,
  Svg as MatterSvg,
} from "matter-js";
import { zip } from "lodash";

import type { IBodyDefinition as IMatterBodyDefinition } from "matter-js";

// PathSeg polyfill for Matter.Svg
import "pathseg";

type BodyOptions = Omit<IMatterBodyDefinition, "position">;

const constructBodyFromSvgString = (
  svgString: string,
  {
    resolution = 10,
  }: {
    resolution?: number;
  } = {},
  bodyOptions?: BodyOptions
): MatterBody => {
  const parser = new DOMParser();
  const svg = parser.parseFromString(svgString, "image/svg+xml");

  const svgPaths = Array.from(svg.querySelectorAll("path"));
  const vertexSets = svgPaths.map((path) =>
    MatterSvg.pathToVertices(path, resolution)
  );
  const pathParts = zip(svgPaths, vertexSets).map(([path, vertices]) => {
    if (typeof path === "undefined" || typeof vertices === "undefined") {
      throw new Error("incompatible sizes of paths and vertices");
    }

    const drawing = path.getAttribute("d");
    if (drawing === null) {
      throw new Error("no 'd' value in path");
    }

    let x = 0;
    let y = 0;
    if (drawing.startsWith("m") || drawing.startsWith("M")) {
      const drawingSplit = drawing.split(" ");

      const [_, xStr, yStr] = drawingSplit;
      if (typeof xStr === "undefined" || typeof yStr === "undefined") {
        throw new Error("could not read values after moveto command");
      }

      x = Number.parseInt(xStr);
      y = Number.parseInt(yStr);
    }

    return MatterBodies.fromVertices(x, y, [vertices], bodyOptions);
  });

  const svgRects = Array.from(svg.querySelectorAll("rect"));
  const rectParts = svgRects.map((rect) =>
    MatterBodies.rectangle(
      rect.x.baseVal.value + rect.width.baseVal.value / 2,
      rect.y.baseVal.value + rect.height.baseVal.value / 2,
      rect.width.baseVal.value,
      rect.height.baseVal.value,
      bodyOptions
    )
  );

  const body = MatterBodies.circle(0, 0, 0, bodyOptions);
  MatterBody.setParts(body, pathParts.concat(rectParts));

  return body;
};

export { constructBodyFromSvgString };
