import React, { FC, useCallback } from "react";
import SuperButton from "../../../common/button/SuperButton";
import s from "./PacksModal.module.css";
import { ModalPropsType } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

type DeletePackModalType = { modalProps: ModalPropsType };
export const DeletePackModal: FC<DeletePackModalType> = ({ modalProps }) => {
  const onDeleteClick = useCallback(() => {
    modalProps.action(modalProps.pack._id);
    modalProps.setShow(false);
    modalProps.setModalType("none");
  }, [modalProps]);

  const OnCancelClick = useCallback(() => {
    modalProps.setShow(false);
  }, [modalProps]);
  if (modalProps.modalType !== "delete") return <></>;
  return (
    <div>
      <div className={s.delHeader}>
        <div>Delete Pack</div>
        <SuperButton
          icon="close"
          style={{ borderWidth: 0 }}
          onClick={OnCancelClick}
          imgStyle={{ width: "15px", height: "15px" }}
        >
          Close
        </SuperButton>
      </div>

      <div className={s.delPackBody}>
        <div>
          Do you really want to remove <b>{modalProps.pack.name}</b>
        </div>
        <div>All cards well be excluded from this course</div>
      </div>

      <div className={s.delButtons}>
        <SuperButton
          onClick={OnCancelClick}
          dis={true}
          style={{
            width: "113px",
            height: "36px",
            fontWeight: "500",
            border: "none",
          }}
        >
          Cancel
        </SuperButton>
        <SuperButton
          onClick={onDeleteClick}
          red={true}
          style={{
            width: "113px",
            height: "36px",
            fontWeight: "500",
            border: "none",
            color: "rgb(255, 255, 255)",
            borderRadius: "36px",
          }}
        >
          Delete
        </SuperButton>
      </div>
    </div>
  );
};
