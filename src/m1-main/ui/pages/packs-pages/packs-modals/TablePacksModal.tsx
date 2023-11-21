import Modal from "m1-main/ui/common/modal/Modal";

import React, { FC } from "react";
import { DeletePackModal } from "m1-main/ui/pages/packs-pages/packs-modals/DeletePackModal";
import EditPackModal from "m1-main/ui/pages/packs-pages/packs-modals/EditPackModal";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import { setPacksModal } from "m1-main/bll/packsModalReducer";
import { deletePackTC, editPackTC } from "m1-main/bll/packsReducer";
import { setCardsTC } from "m1-main/bll/cardsReducer";

export type ActionPackCardType = "none" | "delete" | "edit" | "learn" | "view";

type ModalActionPropsType = {
  name?: string;
  status?: boolean;
  _id?: string;
};
export type ModalPropsType = {
  action: (act: ModalActionPropsType) => void;
  pack?: ModalActionPropsType;
};
export const TablePacksModal: FC = () => {
  const modal = useAppSelector((state) => {
    return state.packsModal;
  });
  const dispatch = useAppDispatch();
  const action = async (act: ModalActionPropsType) => {
    dispatch(
      setPacksModal({
        currentPack: {},
        modalAction: "none",
        showModal: false,
      })
    );
    if (modal.currentPack._id) {
      if (modal.modalAction === "delete" && act._id) {
        await dispatch(deletePackTC({ params: { id: act._id } }));
      } else if (
        modal.modalAction === "edit" &&
        typeof act["name"] !== "undefined"
      ) {
        await dispatch(
          editPackTC({
            cardsPack: {
              _id: modal.currentPack._id,
              name: act.name ? act.name : modal.currentPack.name,
              private:
                act.status !== undefined
                  ? act.status
                  : modal.currentPack.status,
            },
          })
        );
        dispatch(
          setCardsTC({
            cardsPack_id: modal.currentPack._id,
            sortCards: "0grade",
            pageCount: 1000,
          })
        );
      }
    }
  };
  const modalProps: ModalPropsType = {
    action,
    pack: modal.currentPack,
  };
  const backgroundOnClick = () => {
    dispatch(
      setPacksModal({
        currentPack: {},
        modalAction: "none",
        showModal: false,
      })
    );
  };
  return (
    <Modal
      width={500}
      height={300}
      show={modal.showModal ? modal.showModal : false}
      enableBackground={true}
      backgroundOnClick={backgroundOnClick}
      modalStyle={{
        backgroundColor: "#FFFFFF",
        width: "395px",
        height: "auto",
        borderRadius: "2px",
      }}
    >
      {modal.modalAction === "delete" && (
        <DeletePackModal modalProps={modalProps} />
      )}
      {modal.modalAction === "edit" && (
        <EditPackModal modalProps={modalProps} />
      )}
    </Modal>
  );
};
