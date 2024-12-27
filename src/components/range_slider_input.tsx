import cx from "classnames";

const RangeSliderInput = ({
  id,
  value,
  min,
  max,
  step = 1,
  isDisabled = false,
  onChange: handleChange,
}: {
  id?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  isDisabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => (
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
      isDisabled ? "cursor-not-allowed" : "cursor-pointer",
    )}
  />
);

export default RangeSliderInput;
