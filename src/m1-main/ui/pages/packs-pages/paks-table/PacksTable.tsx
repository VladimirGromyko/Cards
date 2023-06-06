import React, {useCallback, useState} from "react";
import {CardPacksType, PacksGetResponseDataType} from "../../../../dal/packs-api";
import { PackItem } from "./PackItem";
import Modal from "../../../common/modal/Modal";
import {DeletePackModal} from "../packs-modals/DeletePackModal";
import EditPackModal from "../packs-modals/EditPackModal";
// import {PackItem} from "./PackItem";
// import {PacksGetResponseDataType} from "../../../../m3-dal/packs-api";
// import l from "../../../common/c7-Loading/loader07.module.css";
// import styles from "../../../common/c9-Pagination/Paginator.module.css";
// import {LoadingStatusType} from "../../../../m2-bll/loadingReducer";
// import Paginator from "../../../common/c9-Pagination/Paginator";
// import ModalDeleteContainer from "../../../../../n2-features/f3-utils/Modal/ModalDeleteContainer";
// import ModalEditContainer from "../../../../../n2-features/f3-utils/Modal/ModalEditContainer";
// import {PackListSize} from "../../../common/c11-PackListSize/PackListSize";

type PacksTableType = {
    // deletePack: (packName: string, pack: string) => void
    deletePackList: (packId: string) => void
    // showDeletePack: (value: boolean) => void
    // deletePackId: string
    // deletePackName: string
    // editPack: (packId: string, namePack: string) => void
    editPackList: (packName: string, privateStatus:boolean, packId: string) => void
    // showEditPack: (value: boolean) => void
    // editPackId: string
    // editPackName: string
    learnPack: (packId: string) => void
    viewPack: (packId: string) => void
    packs: PacksGetResponseDataType
    // isLoading: LoadingStatusType
    // isShownEditPack: boolean
    // isShownDeletePack: boolean
    // currentPage: number
    // onPageChanged: (pageNumber: number) => void
    // changePackListSize: (pageCount: number, page: number) => void
}
export type ActionPackCardType = "none" | "delete" | "edit" | "learn" | "view"

export const PacksTable = ({
                               deletePackList,
                               editPackList,
                               learnPack,
                               viewPack,
                               packs,
                               // isLoading,
                               // currentPage, onPageChanged, changePackListSize
                           }: PacksTableType) => {
    // const onScroll = (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     debugger
    //     console.log(e)
    // }

    const initialCurrentPack: CardPacksType = {
        user_id: "", name: "", _id: "", cardsCount: 0, user_name: "", created: "", updated: "",
        private: false, rating: 0, shots: 0, type: ""
    }
    const [modalType, setModalType] = useState<ActionPackCardType>("none");
    const [currentPack, setCurrentPack] = useState<CardPacksType>(initialCurrentPack);

    const [show, setShow] = useState<boolean>(false);
debugger
    const selectedPackAction = (pack: CardPacksType, type: ActionPackCardType) => {
        setModalType(type)
        if (type !== "none" && type !== "view") {
            setShow(true)
            setCurrentPack(pack)
        }
        if (type === "view") {
            setCurrentPack(pack)
            viewPack(pack._id)
        }
    }
    const backgroundOnClick = () => {
        setShow(false)
        setModalType("none")
    }
    // const [scroll, setScroll] = useState(0);
    // const onScroll = useCallback(() => setScroll(Math.round(window.scrollY)), []);
    // useEffect(() => {
    //     onScroll();
    //     window.addEventListener("scroll", onScroll);
    //     debugger
    //     console.log(scroll)
    //     return () => window.removeEventListener("scroll", onScroll);
    // }, [onScroll]);
    // useEffect(() => window.scrollTo(0, 1000), []);
    //
    // // @ts-ignore
    // useEffect(() => setTimeout(() => window.scrollTo(0, 1000), 2000), []);

    return (
        <div
            // onMouseUp={(e) => onScroll(e)}
            // onMouseDown={(e) => onScroll(e)}
        >
            <Modal width={500}
                   height={300}
                   show={show}
                   enableBackground={true}
                   backgroundOnClick={backgroundOnClick}
                   modalStyle={{
                       backgroundColor: '#FFFFFF',
                       width: '395px',
                       height: 'auto',
                       borderRadius: '2px'
                   }}
            >
                <>
                    <DeletePackModal deletePack={deletePackList} pack={currentPack}
                                     setShow={setShow} setModalType={setModalType}
                                     modalType={modalType}
                    />
                    <EditPackModal editPack={editPackList} pack={currentPack}
                                   setShow={setShow} setModalType={setModalType}
                                   modalType={modalType}
                    />
                </>
            </Modal>
            <>
                {packs?.cardPacks && packs.cardPacks.map((pack) => {
                    return <PackItem key={pack._id} selectedPackAction={selectedPackAction} pack={pack}/>
                })}
            </>
        </div>
    )
}
