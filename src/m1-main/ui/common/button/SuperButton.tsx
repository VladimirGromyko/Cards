import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./SuperButton.module.css";
import hat from "./education.svg";
import edit from "./edit.svg";
import profile from "./user.svg";
import del from "./delete.svg";
import close from "./close.svg";
import logout from "./logout.svg";
import resetFilters from "./filter-remove.svg";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type iconPlaceType =
  | "learn"
  | "delete"
  | "edit"
  | "logout"
  | "close"
  | "reset-filters"
  | undefined;
type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
  dis?: boolean;
  icon?: string;
  iconWithText?: boolean;
  imgStyle?: {};
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  dis,
  icon,
  iconWithText,
  imgStyle,
  ...restProps
}) => {
  let iconPlace: string;
  if (icon === "learn") {
    iconPlace = hat;
  } else if (icon === "edit") {
    iconPlace = edit;
  } else if (icon === "delete") {
    iconPlace = del;
  } else if (icon === "logout") {
    iconPlace = logout;
  } else if (icon === "close") {
    iconPlace = close;
  } else if (icon === "profile") {
    iconPlace = profile;
  } else if (icon === "reset-filters") {
    iconPlace = resetFilters;
  } else iconPlace = "";
  const defaultClass: string = icon
    ? iconWithText
      ? s.iconWithText
      : s.iconDefault
    : s.default;
  const finalClassName = `${
    red ? s.red : dis ? s.dis : defaultClass
  } ${className}`;
  // const finalClassName = `${red ? s.red : s.default && dis ? s.dis : defaultClass} ${className}`
  // const imgClassName = `${imgStyle ? imgStyle : ""} ${s.icon}`
  return (
    <button className={finalClassName} {...restProps}>
      {icon ? (
        iconWithText ? (
          <>
            <img src={iconPlace} alt="картинка" className={s.icon} />
            <span className={s.text}>{restProps.children}</span>
          </>
        ) : (
          <img
            src={iconPlace}
            alt="картинка"
            style={imgStyle}
            className={imgStyle ? "" : s.icon}
          />
        )
      ) : (
        // <img src={iconPlace} alt="картинка" style={imgStyle}/>
        restProps.children
      )}
    </button>
  );
};
export default SuperButton;
