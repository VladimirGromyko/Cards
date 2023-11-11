import Modal from "m1-main/ui/common/modal/Modal";

import React, { FC } from "react";
import { DeletePackModal } from "m1-main/ui/pages/packs-pages/packs-modals/DeletePackModal";
import EditPackModal from "m1-main/ui/pages/packs-pages/packs-modals/EditPackModal";
import { CardPacksType } from "m1-main/dal/packs-api";

export type ActionPackCardType = "none" | "delete" | "edit" | "learn" | "view";
type TablePacksModalType = {
  deletePackList: (packId: string) => void;
  editPackList: (
    packName: string,
    privateStatus: boolean,
    packId: string
  ) => void;
  currentPack: CardPacksType;
  setModalType: (modal: ActionPackCardType) => void;
  modalType: ActionPackCardType;
  show: boolean;
  setShow: (value: boolean) => void;
};
export type ModalPropsType = {
  action: Function;
  pack: CardPacksType;
  setShow: (value: boolean) => void;
  setModalType: (modal: ActionPackCardType) => void;
  modalType: ActionPackCardType;
};
export const TablePacksModal: FC<TablePacksModalType> = ({
  deletePackList,
  editPackList,
  currentPack,
  setModalType,
  modalType,
  show,
  setShow,
}) => {
  let action: Function = () => null;
  if (modalType === "delete") {
    action = deletePackList;
  } else if (modalType === "edit") {
    action = editPackList;
  }
  const modalProps: ModalPropsType = {
    action,
    pack: currentPack,
    setShow: setShow,
    setModalType: setModalType,
    modalType: modalType,
  };
  const backgroundOnClick = () => {
    setShow(false);
    setModalType("none");
  };
  return (
    <Modal
      width={500}
      height={300}
      show={show}
      enableBackground={true}
      backgroundOnClick={backgroundOnClick}
      modalStyle={{
        backgroundColor: "#FFFFFF",
        width: "395px",
        height: "auto",
        borderRadius: "2px",
      }}
    >
      {modalType === "delete" && <DeletePackModal modalProps={modalProps} />}
      {modalType === "edit" && <EditPackModal modalProps={modalProps} />}
    </Modal>
  );
};
