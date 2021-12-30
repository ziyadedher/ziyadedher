import React, { useCallback, useState } from "react";

import RangeSliderInput from "../../../src/components/inputs/range_slider";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Inputs/Range Slider",
  component: RangeSliderInput,
};

interface RangeSliderInputTemplateProps {
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly isDisabled?: boolean;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RangeSliderInputTemplate: Story<RangeSliderInputTemplateProps> = ({
  value,
  min,
  max,
  step,
  isDisabled,
  onChange: handleChange,
}: RangeSliderInputTemplateProps) => (
  <RangeSliderInput
    value={value}
    min={min}
    max={max}
    step={step}
    isDisabled={isDisabled}
    onChange={handleChange}
  />
);

const RangeSliderInputStory = RangeSliderInputTemplate.bind({});
RangeSliderInputStory.storyName = "Range Slider";
RangeSliderInputStory.args = {
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  isDisabled: false,
};
RangeSliderInputStory.argTypes = {
  onChange: { action: "input" },
};

interface RangeSliderInputInteractiveTemplateProps {
  readonly initialValue: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly isDisabled?: boolean;
}

const RangeSliderInputInteractiveTemplate: Story<
  RangeSliderInputInteractiveTemplateProps
> = ({
  initialValue,
  min,
  max,
  step,
  isDisabled,
}: RangeSliderInputInteractiveTemplateProps) => {
  const [value, setValue] = useState(initialValue);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    (e) => {
      setValue(Number(e.target.value));
    },
    []
  );

  return (
    <RangeSliderInput
      value={value}
      min={min}
      max={max}
      step={step}
      isDisabled={isDisabled}
      onChange={handleChange}
    />
  );
};

const RangeSliderInputInteractiveStory =
  RangeSliderInputInteractiveTemplate.bind({});
RangeSliderInputInteractiveStory.storyName = "Range Slider (interactive)";
RangeSliderInputInteractiveStory.args = {
  initialValue: 0,
  min: 0,
  max: 100,
  step: 1,
  isDisabled: false,
};

export { RangeSliderInputStory, RangeSliderInputInteractiveStory };
export default META;
