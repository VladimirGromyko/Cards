import React, {CSSProperties, ReactElement, useEffect, useState} from 'react';
import SuperButton from "../button/SuperButton";
import Modal from "./Modal";
// import ModalQuestion from "./ModalQuestion";
// import SuperButton from "../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
// import {LoadingStatusType} from "../../../n1-main/m2-bll/loadingReducer";
// import {AddPack} from "../../../n1-main/m1-ui/pages/MainPage/PackList/AddPack";


type ModalContainerType = {
    // realize: (pack: string) => void
    title?: string
    buttonStyle: {}

    show: boolean
    setShow: (value: boolean) => void
    modalStyle?: CSSProperties
    // hideAddPack: (value: boolean) => void
    // showPack: (value: boolean) => void
    // isLoading: LoadingStatusType
    // // isShownAddPack: boolean
    // isShownPack: boolean
    children: ReactElement
}

const ModalContainer: React.FC<ModalContainerType> = (
    {
        // realize,
        title,
        buttonStyle,
        show,
        setShow,
        modalStyle,
        // hideAddPack,
        // showPack,
        // isLoading,
        // isShownAddPack,
        // isShownPack,
        children
    }) => {
    // const [show, setShow] = [showAddPacksModal, setShowAddPacksModal]

    // const [answer, setAnswer] = useState(false);
    const setModalWindow = (val: boolean) => {
        // setAnswer(true);
        // hideAddPack(false)
        // showPack(false)
        // setShow(false);
        setShow(val);
    };
    // useEffect(() => {
    //     debugger
    //     setShow(showAddPacksModal)
    // },[showAddPacksModal])
    // const setFalse = () => {
    //     setAnswer(false);
        // hideAddPack(false)
        // showPack(false)
        // setShow(false);
    // };
    // answer && addPack('My pack for new day')


    return (
        <>
            {/*<div>*/}
            {/*<SuperButton onClick={() => showPack(true)}*/}
                <SuperButton
                    onClick={() => setModalWindow(true)}
                    // onClick={() => setShow(true)}
                    style={buttonStyle}
                >{title}
                </SuperButton>
                {/*<SuperButton onClick={() => hideAddPack(true)}>Add new pack</SuperButton>*/}
                {/*<SuperButton onClick={() => setShow(true)}>Add new pack</SuperButton>*/}
                {/*{answer ? <span>Yes</span> : <span>No</span>}*/}
            {/*</div>*/}

            {/*/!*<ModalQuestion*!/*/}
            <Modal

                show={show}
                // show={isShownAddPack}
                // show={show}

                // setTrue={setTrue}
                // setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                modalStyle={modalStyle}
                width={500}
                height={300}
            >
                {children}
                {/*{children ? children : 'question Modal'}*/}
            {/*    <AddPack addPack={addPack} isLoading={isLoading} setFalse={setFalse}/>*/}
            {/*/!*</ModalQuestion>*!/*/}
            </Modal>

        </>
    )
        ;
};

export default ModalContainer;
