import s from "./popover.module.css";
import React, {CSSProperties, ReactElement, useState} from "react";
import {RecordType} from "../../pages/cards-pages/CardsPage";
import SuperButton from "../button/SuperButton";

// export type RecordsType = string | number | undefined | null
type PopoverType = {
    // header?: string
    outStyle?: CSSProperties
    records: Array<RecordType>
    selectedRecord: (record: RecordType) => void
    children?: ReactElement | string
}
const Popover = ({outStyle, records, selectedRecord, children}:PopoverType) => {
    const [menuPopover, setMenuPopover] = useState<boolean>(false)
    const showMenu = `${s.menuWrapper} ${menuPopover ? s.menuShow : s.menuHidden}`
    return (
          <div className={s.popover}
               onMouseOver={() => setMenuPopover(true)}
               onMouseLeave={() => setMenuPopover(false)}
               style={outStyle? outStyle : undefined}
          >{children}
              <div className={showMenu}>
                  <div className={s.arrow}></div>
                  <div className={s.menu} onMouseLeave={() => setMenuPopover(false)}>
                      {records.length
                          ? records.map((el, ind) => {
                              return (
                                  <div className={s.popoverItem} onClick={() => selectedRecord(el)}
                                       key={`${ind}-${el.type}`}>
                                          <SuperButton
                                              // onClick={() => onPressHandler("edit")}
                                              icon={el.type}
                                              style={{borderWidth: 0}}
                                          />
                                          {el.name}
                                  </div>
                              )
                          })
                          : <></>
                      }
                  </div>
              </div>
          </div>
    )
}
export default Popover
