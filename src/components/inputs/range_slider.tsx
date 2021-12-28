import React from "react";

interface RangeSliderInputProps {
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly isDisabled?: boolean;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RangeSliderInput: React.FunctionComponent<RangeSliderInputProps> = ({
  value,
  min,
  max,
  step,
  isDisabled = false,
  onChange: handleChange,
}: RangeSliderInputProps) => (
  <input
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    disabled={isDisabled}
    onChange={handleChange}
    className={isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
  />
);

export default RangeSliderInput;
