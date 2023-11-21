import s from "./PackListSize.module.css";
import { ChangeEvent, useState } from "react";

type PackListSizeType = {
  // changePackListSize: (page: number, pageCount: number) => void
  changePackListSize: (pageCount: number) => void;
  pageCount: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void | undefined;
};
export const PackListSize = ({
  changePackListSize,
  currentPage,
  pageCount,
  onPageChanged,
}: PackListSizeType) => {
  const options = [
    { value: "10" },
    { value: "15" },
    { value: "20" },
    { value: "30" },
    { value: "50" },
  ];

  const [selected, setSelected] = useState(pageCount);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = +event.currentTarget.value;
    setSelected(pageSize);

    // let correctionNumber = currentPage
    // if (currentPage && currentPage > pageSize) {
    //     correctionNumber = pageSize - 9
    // }
    changePackListSize(pageSize);
    // changePackListSize(correctionNumber, pageSize)
  };
  return (
    <div className={s.packListSizeWrapper}>
      <div className={s.packListSizeContent}>Show packs</div>

      <select
        className={s.select}
        value={selected}
        onChange={(e) => handleChange(e)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={s.selectedValue}
          >
            {option.value}
          </option>
        ))}
      </select>
      <div className={s.packListSizeContent}>per page</div>
    </div>
  );
};
