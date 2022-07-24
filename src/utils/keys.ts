import { useEffect, useState } from "react";

const useKeys = (): Set<string> => {
  const [keys, setKeys] = useState(new Set<string>());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.KeyboardEvent
    document.addEventListener("keydown", (e) => {
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Set<string>
      setKeys((currentKeys) => {
        const newKeys = new Set(currentKeys);
        newKeys.add(e.code);
        return newKeys;
      });
    });
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.KeyboardEvent
    document.addEventListener("keyup", (e) => {
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Set<string>
      setKeys((currentKeys) => {
        const newKeys = new Set(currentKeys);
        newKeys["delete"](e.code);
        return newKeys;
      });
    });
  }, [setKeys]);

  return keys;
};

export { useKeys };
