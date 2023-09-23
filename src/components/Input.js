import React, { useState, useEffect, useRef } from "react";
import { reactData } from "../mockData";
import FoundItems from "../components/FoundItems";
import { getSerchItems, generateList } from "../helpers";

const LOCAL_STORAGE_KEY = "serchInput";

const Input = () => {
  const [value, setValue] = useState("");
  const [titles, setTitles] = useState([]);
  const [searchTitles, setSearchTitles] = useState([]);
  const [hasFocused, setHasFocused] = useState(true);
  const [showItem, setShowItem] = useState(false);
  const [displayItems, setDiplayItems] = useState([]);
  const ref = useRef();
  const [savedItems, setSavedItems] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    ref.current.focus();
    setTitles(reactData().map((item) => item.title));
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

  const handleKeyDown = (event) => {
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
        className={(hasFocused || removing) && value ? "active" : ""}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {searchTitles.length > 0 && (hasFocused || removing) && value && (
        <ul>
          {generateList(searchTitles, savedItems, { onSelect, onRemove })}
        </ul>
      )}
      {showItem && displayItems.length > 0 && (
        <FoundItems items={displayItems} />
      )}
    </div>
  );
};

export default Input;
