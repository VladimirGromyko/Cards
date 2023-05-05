import React, {useEffect, useState} from 'react';
import s from './superDoubleStyles.module.css'
import useDebounce from '../../features/hooks/useDebounce';
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {setPacksDataTC} from "../../../bll/packsReducer";
import SuperDoubleRange from "./SuperDoubleRange";

const Slider = () => {
    const maxRX = useAppSelector((state) => state.packs.max)
    const minRX = useAppSelector((state) => state.packs.min)

debugger

    const dispatch = useAppDispatch()

    const [value, setValue] = useState<[number, number]>([0, 100])
    const [isDebouncing, setIsDebouncing] = useState(false);

    const debouncedValue = useDebounce(value, 1500);

    useEffect(() => {
        if (debouncedValue[0] !== minRX || debouncedValue[1] !== maxRX) {
            setIsDebouncing(true);
            dispatch(setPacksDataTC( {params: {min: debouncedValue[0], max: debouncedValue[1]}})
            // dispatch(getPacksByMinMaxTC( {min: debouncedValue[0], max: debouncedValue[1]})
            )
        }
    },[debouncedValue, dispatch]
    );
    useEffect(() => {
        setValue([minRX !== undefined ? minRX : value[0], maxRX !== undefined ? maxRX : value[1]])
        },[minRX, maxRX, dispatch]
    );
    return (
        <>
            <span className={s.numbersWrapper}>
                <div className={s.title}>{value[0]}</div>
                <div className={s.mainWrapper}>
                    <SuperDoubleRange setValue={setValue} min={value[0]} max={value[1]}/>
                </div>
                <div className={s.title}>{value[1]}</div>
            </span>
        </>
    );
};

export default Slider;

