import React, { useCallback } from "react";
import { CardPacksType } from "m1-main/dal/packs-api";
import { changeDateView } from "../../utils/changeDateView";
import packsStyle from "./PacksTable.module.css";
import SuperButton from "../../../common/button/SuperButton";
import { useAppSelector } from "m1-main/bll/hooks";
import { ActionPackCardType } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

type TableItemPropsType = {
  pack: CardPacksType;
  selectedPackAction: (pack: CardPacksType, type: ActionPackCardType) => void;
};

export const PackItem = ({ selectedPackAction, pack }: TableItemPropsType) => {
  const user_id = useAppSelector((state) => state.auth.meStatus?._id);
  const onPressHandler = useCallback(
    (type: ActionPackCardType) => {
      selectedPackAction(pack, type);
    },
    [selectedPackAction, pack]
  );
  //
  // const onEditPressHandler = useCallback(() => {
  //     editPackList(pack.name, pack._id)
  // }, [editPackList, pack.name, pack._id])
  //
  // const onLearnPressHandler = useCallback(() => {
  //     learnPack(pack._id)
  // }, [learnPack, pack._id])

  return (
    <div className={packsStyle.items}>
      <div
        className={packsStyle.item}
        // style={{cursor: "pointer"}}
        onClick={() => onPressHandler("view")}
        // onClick={() => navigate(`${PATH.PACKS}/${pack._id}`)}
      >
        <div className={packsStyle.itemsLongName}>{pack.name}</div>
      </div>

      <div className={packsStyle.item}>{pack.cardsCount}</div>
      <div className={packsStyle.item}>{changeDateView(pack.created)}</div>
      <div className={packsStyle.item}>{pack.user_name}</div>
      <div
        className={
          pack.user_id === user_id
            ? packsStyle.itemAction
            : packsStyle.itemShortAction
        }
      >
        <SuperButton
          onClick={() => onPressHandler("learn")}
          icon="learn"
          style={{ borderWidth: 0 }}
        >
          Learn
        </SuperButton>
        {pack.user_id === user_id && (
          <SuperButton
            onClick={() => onPressHandler("edit")}
            icon="edit"
            style={{ borderWidth: 0 }}
          >
            Edit
          </SuperButton>
        )}
        {pack.user_id === user_id && (
          <SuperButton
            icon="delete"
            style={{ borderWidth: 0 }}
            onClick={() => onPressHandler("delete")}
          >
            Delete
          </SuperButton>
        )}
      </div>
    </div>
  );
};
