import React, { FC, useCallback, useState } from "react";
import s from "./PacksModal.module.css";
import SuperCheckbox from "../../../common/сheckbox/SuperCheckbox";
import SuperButton from "../../../common/button/SuperButton";
import SuperInputText from "../../../common/input/SuperInputText";
import { ModalPropsType } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

type EditPackType = { modalProps: ModalPropsType };

const EditPackModal: FC<EditPackType> = ({ modalProps }) => {
  const [newPackName, setNewPackName] = useState<string>(
    modalProps.pack?.name ? modalProps.pack.name : ""
  );
  const [privateStatus, setPrivate] = useState<boolean>(
    modalProps.pack?.status ? modalProps.pack.status : false
  );
  const onKeyPressHandler = useCallback(() => {
    modalProps.action({ name: newPackName.trim(), status: privateStatus });
  }, [modalProps, newPackName, privateStatus]);
  const OnCancelClick = useCallback(() => {
    modalProps.action({});
  }, [modalProps]);

  return (
    <div>
      <div className={s.delHeader}>
        <div>Edit pack</div>
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
        <div className={s.textField}>Name pack</div>
        <SuperInputText
          value={newPackName}
          onChangeText={setNewPackName}
          onEnter={onKeyPressHandler}
          placeholder={"Name Pack"}
          className={"inOneLine"}
        />
        <div className={s.textField}>
          <SuperCheckbox
            defaultChecked={privateStatus}
            onChangeChecked={setPrivate}
          >
            Private pack
          </SuperCheckbox>
        </div>
      </div>
      <div className={s.delButtons}>
        <SuperButton
          onClick={OnCancelClick}
          dis={true}
          style={{
            width: "12ch",
            fontWeight: "500",
            border: "none",
          }}
        >
          Cancel
        </SuperButton>
        <SuperButton
          onClick={onKeyPressHandler}
          dis={true}
          style={{
            color: "white",
            width: "12ch",
            fontWeight: "500",
            border: "none",
            background: "#678EFE",
          }}
        >
          Save
        </SuperButton>
      </div>
    </div>
  );
};

export default EditPackModal;
