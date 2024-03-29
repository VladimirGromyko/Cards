import React, { ChangeEvent, FC, useEffect, useState } from "react";
import useDebounce from "m1-main/ui/features/hooks/useDebounce";
import { setPacksDataTC } from "m1-main/bll/packsReducer";
import SuperInputText from "m1-main/ui/common/input/SuperInputText";
import { useAppDispatch, useAppSelector } from "m1-main/bll/hooks";
import { setCardsTC } from "m1-main/bll/cardsReducer";

type SearchType = {
  placeholder: string;
  searchPlace: "packs" | "cards";
  clear?: boolean;
  setClear?: (clear: boolean) => void;
  id?: string;
};
const Search: FC<SearchType> = ({
  placeholder,
  searchPlace,
  clear,
  setClear,
  id,
}) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const debouncedValue: string = useDebounce(search, 1500);
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    searchPlace === "packs" &&
      dispatch(setPacksDataTC({ params: { packName: debouncedValue } }));
    if (searchPlace === "cards") {
      let value;
      if (debouncedValue) {
        value = { cardQuestion: debouncedValue };
      } else value = {};
      dispatch(setCardsTC({ ...value, cardsPack_id: id }));
    }
  }, [dispatch, debouncedValue, id, searchPlace]);
  useEffect(() => {
    if (clear && setClear) {
      setSearch("");
      setClear(false);
    }
  }, [clear, setClear]);
  return (
    <SuperInputText
      placeholder={placeholder}
      onChange={onSearchHandler}
      value={search}
    />
  );
};
export default Search;
