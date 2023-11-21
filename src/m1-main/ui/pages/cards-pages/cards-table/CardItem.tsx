import React, { useCallback } from "react";
import s from "./CardsTable.module.css";
import { changeDateView } from "../../utils/changeDateView";
import { CardsType } from "m1-main/dal/cards-api";
import fullStar from "./../../utils/Star-3_full.svg";
import halfStar from "./../../utils/Star-4_half_full.svg";
import emptyStar from "./../../utils/Star-5_empty.svg";
import SuperButton from "m1-main/ui/common/button/SuperButton";
import { ActionPackCardType } from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

type CardItemPropsType = {
  card: CardsType;
  isMine: boolean;
  selectedCardAction: (card: CardsType, type: ActionPackCardType) => void;
  // show: boolean
  // setShow: (value: boolean) => void
  // editShow:boolean
  // setEditShow: (value: boolean) => void
};
type starsType = "fullStar" | "halfStar" | "emptyStar";

const StarReturn = (starsModel: starsType) => {
  let icon = fullStar;
  if (starsModel === "halfStar") icon = halfStar;
  if (starsModel === "emptyStar") icon = emptyStar;
  return <img src={icon} alt="картинка" className={s.icon} />;
};
const makeStarsBlock = (
  fullStars: number,
  halfStars: number,
  emptyStars: number
) => {
  let stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(StarReturn("fullStar"));
  }
  if (halfStars) stars.push(StarReturn("halfStar"));
  for (let i = 0; i < emptyStars; i++) {
    stars.push(StarReturn("emptyStar"));
  }
  const starsBlock = stars.map((el, ind) => {
    return <span key={`${ind}-star`}>{el}</span>;
  });
  return <>{starsBlock}</>;
};
export const CardItem = ({
  // show,
  // setShow,
  card,
  isMine,
  selectedCardAction,
}: // editShow,
// setEditShow
CardItemPropsType) => {
  // const user = useSelector<AppStoreType, UserDataType | null>(state => state.login.user)
  const starsFullNumber = card.grade ? Math.round(card.grade) : 0;
  const starsHalf = card.grade && card.grade - starsFullNumber > 0.5 ? 1 : 0;
  const emptyStarsNumber = 5 - starsFullNumber;

  const onPressHandler = useCallback(
    (type: ActionPackCardType) => {
      selectedCardAction(card, type);
    },
    [selectedCardAction, card]
  );

  return (
    <div className={s.items}>
      <div className={s.item} onDoubleClick={() => onPressHandler("edit")}>
        {card.question}
      </div>
      <div className={s.item} onDoubleClick={() => onPressHandler("edit")}>
        {card.answer}
      </div>
      <div className={s.item}>
        {changeDateView(card.updated ? card.updated : "")}
      </div>

      {/*<div className={s.item}>{card.grade}</div>*/}
      <div className={s.item}>
        {makeStarsBlock(starsFullNumber, starsHalf, emptyStarsNumber)}
      </div>

      <div className={s.item}>
        {
          isMine && (
            <SuperButton
              onClick={() => onPressHandler("edit")}
              icon="edit"
              style={{ borderWidth: 0 }}
            />
          )
          // </SuperButton>
          // <DeleteCardModal show={show} setShow={setShow} cardId={card._id}/>
        }
        {
          isMine && (
            <SuperButton
              icon="delete"
              style={{ borderWidth: 0 }}
              onClick={() => onPressHandler("delete")}
            />
          )
          // </SuperButton>
          // <EditCardModal show={editShow} setShow={setEditShow} cardId={card._id} />
        }
      </div>
    </div>
  );
};
