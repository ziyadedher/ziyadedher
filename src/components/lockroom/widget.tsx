import React, { useCallback, useState } from "react";

enum LockRoomWidgetState {
  LOCKED = 0,
  INCORRECT = 1,
}

interface LockRoomWidgetProps {
  readonly state: LockRoomWidgetState;
  readonly onSubmit: (passcode: string) => void;
}

const LockRoomWidget: React.FunctionComponent<LockRoomWidgetProps> = ({
  state,
  onSubmit,
}) => {
  const [passcode, setPasscode] = useState("");

  const handlePasscodeChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
      (e) => {
        setPasscode(e.target.value);
      },
      []
    );

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      onSubmit(passcode);
    }, [onSubmit, passcode]);

  return (
    <div>
      <input
        type="password"
        placeholder="Enter your passcode..."
        value={passcode}
        onChange={handlePasscodeChange}
      />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default LockRoomWidget;
export { LockRoomWidgetState };
