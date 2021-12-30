import cx from "classnames";
import React from "react";

interface RangeSliderInputProps {
  readonly id?: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly isDisabled?: boolean;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RangeSliderInput: React.FunctionComponent<RangeSliderInputProps> = ({
  id,
  value,
  min,
  max,
  step = 1,
  isDisabled = false,
  onChange: handleChange,
}: RangeSliderInputProps) => (
  <input
    id={id}
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    disabled={isDisabled}
    onChange={handleChange}
    className={cx(
      "w-full",
      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
    )}
  />
);

export default RangeSliderInput;
