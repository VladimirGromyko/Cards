import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'
import hat from './education.svg'
import edit from './edit.svg'
import del from './delete.svg'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type iconPlaceType = "learn" | "delete" | "edit" | undefined
type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    dis?: boolean
    icon?: iconPlaceType
}


const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,dis,
        icon, ...restProps
    }) => {

    let iconPlace: string;
    if (icon === "learn") {
        iconPlace = hat
    } else if (icon === "edit") {
        iconPlace = edit
    } else if (icon === "delete") {
    iconPlace = del
    }
    else iconPlace = ""
    const defaultClass: string = icon ? s.iconDefault : s.default;
    const finalClassName = `${red ? s.red : s.default && dis ? s.dis : defaultClass} ${className}`
    return (
        <button

            className={finalClassName}
            {...restProps}
        >
            {icon
                ? <img src={iconPlace} alt="картинка" className={s.icon}/>
                : restProps.children
            }
        </button>
    )
}
export default SuperButton
