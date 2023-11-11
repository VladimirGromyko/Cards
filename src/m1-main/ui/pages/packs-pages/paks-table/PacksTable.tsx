import React, { useState } from "react";
import { CardPacksType, PacksGetResponseDataType } from "m1-main/dal/packs-api";
import { PackItem } from "./PackItem";
import {
  ActionPackCardType,
  TablePacksModal,
} from "m1-main/ui/pages/packs-pages/packs-modals/TablePacksModal";

type PacksTableType = {
  deletePackList: (packId: string) => void;
  editPackList: (
    packName: string,
    privateStatus: boolean,
    packId: string
  ) => void;
  learnPack: (packId: string) => void;
  viewPack: (packId: string) => void;
  packs: PacksGetResponseDataType;
};

export const PacksTable = ({
  deletePackList,
  editPackList,
  learnPack,
  viewPack,
  packs,
}: PacksTableType) => {
  const initialCurrentPack: CardPacksType = {
    user_id: "",
    name: "",
    _id: "",
    cardsCount: 0,
    user_name: "",
    created: "",
    updated: "",
    private: false,
    rating: 0,
    shots: 0,
    type: "",
  };
  const [modalType, setModalType] = useState<ActionPackCardType>("none");
  const [currentPack, setCurrentPack] =
    useState<CardPacksType>(initialCurrentPack);

  const [show, setShow] = useState<boolean>(false);
  const selectedPackAction = (
    pack: CardPacksType,
    type: ActionPackCardType
  ) => {
    if (type !== "learn") {
      setModalType(type);
      if (type !== "none" && type !== "view") {
        setShow(true);
        setCurrentPack(pack);
      }
      if (type === "view") {
        setCurrentPack(pack);
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
      <TablePacksModal
        deletePackList={deletePackList}
        editPackList={editPackList}
        currentPack={currentPack}
        setModalType={setModalType}
        modalType={modalType}
        show={show}
        setShow={setShow}
      />
      <>
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
      </>
    </div>
  );
};
