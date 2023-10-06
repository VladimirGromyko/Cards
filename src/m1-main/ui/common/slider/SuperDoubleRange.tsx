import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import s from "./superDoubleStyles.module.css";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  onChangeRange?: (value: [number, number]) => void;
  value?: [number, number];
  min: number;
  max: number;
  setValue: (value: [number, number]) => void;
};

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({
  onChangeRange,
  value,
  min,
  max,
  onChange,
  setValue,
}) => {
  const fillColor = `linear-gradient(to right, #dadae5 ${min}% , #3264fe ${min}% , #3264fe ${max}%, #dadae5 ${max}%)`;
  const leftInput = `${s.range} ${s.left}`;
  const rightInput = `${s.range} ${s.right}`;

  const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);

    onChangeRange && onChangeRange([+e.currentTarget.value, max]);
    if (+e.currentTarget.value < max) {
      setValue([+e.currentTarget.value, max]);
    }
  };
  const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e); // сохраняем старую функциональность

    onChangeRange && onChangeRange([min, +e.currentTarget.value]);
    if (+e.currentTarget.value > min) {
      setValue([min, +e.currentTarget.value]);
    }
  };

  return (
    <>
      {/*<div className={s.wrapper}>*/}
      <div className={s.container}>
        <div className={s.sliderTrack} style={{ background: fillColor }}></div>
        <input
          type="range"
          min="0"
          max="100"
          value={min < max ? min : max}
          id="slider-1"
          className={leftInput}
          onChange={onMinChange}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={max > min ? max : min}
          id="slider-2"
          className={rightInput}
          onChange={onMaxChange}
        />
      </div>
      {/*</div>*/}
    </>
  );
};

export default SuperDoubleRange;
