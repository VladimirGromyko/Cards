import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'
import hat from './education.svg'
import edit from './edit.svg'
import del from './delete.svg'
import logout from './logout.svg'
import resetFilters from './filter-remove.svg'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type iconPlaceType = "learn" | "delete" | "edit" | "logout" | "reset-filters" |undefined
type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    dis?: boolean
    icon?: iconPlaceType
    iconWithText?: boolean
}


const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,dis,
        icon, iconWithText, ...restProps
    }) => {
    let iconPlace: string;
    if (icon === "learn") {
        iconPlace = hat
    } else if (icon === "edit") {
        iconPlace = edit
    } else if (icon === "delete") {
        iconPlace = del
    } else if (icon === "logout") {
        iconPlace = logout
    } else if (icon === "reset-filters") {
        iconPlace = resetFilters
    } else iconPlace = ""
    const defaultClass: string = icon
        ? iconWithText
            ? s.iconWithText
            : s.iconDefault
        : s.default;
    const finalClassName =
        `${red 
            ? s.red 
            : dis 
                ? s.dis 
                : defaultClass} ${className}`
    // const finalClassName = `${red ? s.red : s.default && dis ? s.dis : defaultClass} ${className}`
    return (
        <button

            className={finalClassName}
            {...restProps}
        >
            {icon
                ? ( iconWithText
                    ? <>
                        <img src={iconPlace} alt="картинка" className={s.icon}/>
                        <span className={s.text}>{restProps.children}</span>
                    </>
                    :
                    <img src={iconPlace} alt="картинка" className={s.icon}/>
                )
                : restProps.children
            }
        </button>
    )
}
export default SuperButton
