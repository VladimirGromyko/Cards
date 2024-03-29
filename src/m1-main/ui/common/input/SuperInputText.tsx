import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";
import s from "./SuperInputText.module.css";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  onKeyPress?: (value: string) => void;
  error?: string;
  spanClassName?: string;
  value?: string;
  // onChange: (newValue: string) => void
};

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
  type,
  value,
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  children,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);
    onEnter && e.key === "Enter" && onEnter();
  };
  const defaultClass =
    className === "inOneLine" ? `${s.inOneLine}` : `${s.superInput}`;
  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
  const finalInputClassName = error
    ? `${s.superInput} ${s.errorInput}`
    : defaultClass;

  return (
    <>
      <input
        type={type}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}
        value={value}
        autoFocus
        {...restProps}
      />
      {error && <div className={finalSpanClassName}>{error}</div>}
    </>
  );
};

export default SuperInputText;
