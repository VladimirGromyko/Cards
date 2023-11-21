import React, { useState } from "react";
import { CardPacksType, PacksGetResponseDataType } from "m1-main/dal/packs-api";
import { PackItem } from "./PackItem";
import {
  ActionPackCardType,
  TablePacksModal,
} from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";
import { useAppDispatch } from "m1-main/bll/hooks";
import { setPacksModal } from "m1-main/bll/packsModalReducer";

type PacksTableType = {
  learnPack: (packId: string) => void;
  viewPack: (packId: string) => void;
  packs: PacksGetResponseDataType;
};

export const PacksTable = ({ learnPack, viewPack, packs }: PacksTableType) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const selectedPackAction = (
    pack: CardPacksType,
    type: ActionPackCardType
  ) => {
    if (type !== "learn") {
      if (type !== "none" && type !== "view") {
        setModal(true);
        dispatch(
          setPacksModal({
            currentPack: {
              _id: pack._id,
              name: pack.name,
              status: pack.private,
            },
            modalAction: type,
            showModal: true,
          })
        );
      }
      if (type === "view") {
        viewPack(pack._id);
      }
    } else {
      learnPack(pack._id);
    }
  };
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
      {modal && <TablePacksModal />}
      {packs?.cardPacks &&
        packs.cardPacks.map((pack) => {
          return (
            <PackItem
              key={pack._id}
              selectedPackAction={selectedPackAction}
              pack={pack}
            />
          );
        })}
    </div>
  );
};
