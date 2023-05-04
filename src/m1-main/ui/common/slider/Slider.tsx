import React, {useEffect, useState} from 'react';
import s from './superDoubleStyles.module.css'
import useDebounce from '../../features/hooks/useDebounce';
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {getPacksByMinMaxTC} from "../../../bll/packsReducer";
import SuperDoubleRange from "./SuperDoubleRange";

const Slider = () => {
    const maxRX = useAppSelector((state) => state.packs.max)
    const minRX = useAppSelector((state) => state.packs.min)



    const dispatch = useAppDispatch()

    const [value, setValue] = useState([0, 100])
    const [isDebouncing, setIsDebouncing] = useState(false);

    const debouncedValue = useDebounce(value, 1500);

    useEffect(() => {
        if (debouncedValue[0] !== minRX || debouncedValue[1] !== maxRX) {
            setIsDebouncing(true);
            dispatch(getPacksByMinMaxTC( {min: debouncedValue[0], max: debouncedValue[1]})
            )
        }
    },[debouncedValue, dispatch]
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

