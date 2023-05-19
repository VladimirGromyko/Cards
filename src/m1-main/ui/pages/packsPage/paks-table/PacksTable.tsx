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
    packs: PacksGetResponseDataType
    // isLoading: LoadingStatusType
    // isShownEditPack: boolean
    // isShownDeletePack: boolean
    // currentPage: number
    // onPageChanged: (pageNumber: number) => void
    // changePackListSize: (pageCount: number, page: number) => void
}
export type ActionPackType = "none" | "delete" | "edit" | "learn"

export const PacksTable = ({
                               // deletePack,
                               deletePackList,
                               // showDeletePack,
                               // deletePackId,
                               // deletePackName, editPack,
                               editPackList,
                               learnPack,
                               packs,
                               // isLoading,
                               // isShownEditPack, isShownDeletePack,
                               // currentPage, onPageChanged, changePackListSize
                           }: PacksTableType) => {
    // const onScroll = (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     debugger
    //     console.log(e)
    // }
    // const [showDeletePackModal, setShowDeletePackModal] = useState<boolean>(false);
    // const [showEditPackModal, setShowEditPackModal] = useState<boolean>(false);
    // const [showLearnPackModal, setShowLearnPackModal] = useState<boolean>(false);
    const initialCurrentPack: CardPacksType = {
        user_id: "", name: "", _id: "", cardsCount: 0, user_name: "", created: "", updated: "",
        private: false, rating: 0, shots: 0, type: ""
    }
    const [modalType, setModalType] = useState<ActionPackType>("none");
    const [currentPack, setCurrentPack] = useState<CardPacksType>(initialCurrentPack);

    const [show, setShow] = useState<boolean>(false);

    const selectedPackAction = (pack: CardPacksType, type: ActionPackType) => {
        setModalType(type)
        if (type !== "none") {
            setShow(true)
            setCurrentPack(pack)
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

            {/*{isLoading === "loading" && <div className={l.loader07}></div>}*/}

            {/*<ModalEditContainer*/}
            {/*    editPack={editPack}*/}
            {/*    editPackId={editPackId}*/}
            {/*    editPackName={editPackName}*/}
            {/*    showPack={showEditPack}*/}
            {/*    isLoading={isLoading}*/}
            {/*    isShownPack={isShownEditPack}*/}
            {/*/>*/}

            {/*<ModalDeleteContainer*/}
            {/*    deletePack={deletePack}*/}
            {/*    deletePackId={deletePackId}*/}
            {/*    deletePackName={deletePackName}*/}
            {/*    showPack={showDeletePack}*/}
            {/*    isLoading={isLoading}*/}
            {/*    isShownPack={isShownDeletePack}*/}
            {/*/>*/}
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
                        return (

                            <PackItem key={pack._id}
                                      deletePackList={deletePackList}
                                      selectedPackAction={selectedPackAction}
                                      // editPackList={editPackList}
                                      // learnPack={learnPack}
                                      pack={pack}
                            />
                        )
                    })
                }
                {/*<div className={styles.paginationWrapper}>*/}
                {/*    <Paginator cardPacksTotalCount={packs.cardPacksTotalCount}*/}
                {/*               pageCount={packs.pageCount}*/}
                {/*               currentPage={packs.page}*/}
                {/*               onPageChanged={onPageChanged}*/}
                {/*               portionSize={undefined}*/}
                {/*    />*/}
                {/*    <PackListSize changePackListSize={changePackListSize}*/}
                {/*                  pageCount={packs.pageCount}*/}
                {/*                  currentPage={packs.page}*/}
                {/*                  onPageChanged={onPageChanged}*/}
                {/*    />*/}
                {/*</div>*/}

            </>
        </div>
    )
}
