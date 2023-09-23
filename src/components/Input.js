import React, { useState, useEffect, useRef } from "react";
import { reactData } from "../mockData";
import FoundItems from "../components/FoundItems";
import ResultStat from "../components/ResultStat";
import { getSerchItems, generateList } from "../helpers";

const LOCAL_STORAGE_KEY = "serchInput";
const titles = reactData().map((item) => item.title);

const Input = () => {
  const [value, setValue] = useState("");
  const [searchTitles, setSearchTitles] = useState([]);
  const [hasFocused, setHasFocused] = useState(true);
  const [showItem, setShowItem] = useState(false);
  const [displayItems, setDiplayItems] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [removing, setRemoving] = useState(false);
  const ref = useRef();
  const [savedItems, setSavedItems] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );

  useEffect(() => {
    ref.current.focus();
    document.addEventListener("click", (e) => {
      setRemoving(false);
    });
    return document.removeEventListener("click", (e) => {
      setRemoving(false);
    });
  }, []);

  const setNewStorage = (arr) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
    setSavedItems(arr);
  };

  const onRemove = (e, title) => {
    e.stopPropagation(e);
    setRemoving(true);
    const indexToRemove = savedItems.findIndex((i) => i === title);
    const newSavedItems = [...savedItems];
    newSavedItems.splice(indexToRemove, 1);
    setNewStorage(newSavedItems);
  };

  const onSelect = (e, title) => {
    setStartTime(performance.now());
    setRemoving(false);
    const serchItems = getSerchItems(reactData(), title);
    setDiplayItems(serchItems);
    setShowItem(true);
    setValue(title);
    const newSavedItems = [...new Set([...savedItems, title])];
    setNewStorage(newSavedItems);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    const searchTitles = titles.filter((title) =>
      title.toLowerCase().startsWith(e.target.value)
    );
    setSearchTitles([...new Set(searchTitles)]);
  };

  const showDropDown = () =>
    searchTitles.length > 0 && (hasFocused || removing) && value;

  const handleKeyDown = (event) => {
    setStartTime(performance.now());
    if (event.key === "Enter") {
      setHasFocused(false);
      ref.current.blur();
      const serchItems = getSerchItems(reactData(), value);
      setDiplayItems(serchItems);
      setShowItem(true);
    }
  };

  const onBlur = () => {
    setHasFocused(false);
  };
  const onFocus = () => {
    setHasFocused(true);
  };

  return (
    <div className="container">
      <h3>SearchX</h3>
      <input
        ref={ref}
        className={
          (hasFocused || removing) && value && !!searchTitles.length
            ? "active"
            : ""
        }
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {showDropDown() ? (
        <ul>
          {generateList(searchTitles, savedItems, { onSelect, onRemove })}
        </ul>
      ) : (
        value && (
          <ResultStat count={displayItems.length} startTime={startTime} />
        )
      )}
      {showItem && displayItems.length > 0 && (
        <FoundItems items={displayItems} />
      )}
    </div>
  );
};

export default Input;
