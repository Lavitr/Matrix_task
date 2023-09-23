export const generateSearchItemsArray = (muchSerchArray, savedItems) => {
  const itemsInMemoryArray = savedItems
    .reverse()
    .filter((i) => !!muchSerchArray.find((title) => i === title));
  const itemsNotinMemory = muchSerchArray.filter(
    (title) => !savedItems.find((i) => i === title)
  );
  return [
    [...itemsInMemoryArray, ...itemsNotinMemory],
    itemsInMemoryArray.length,
  ];
};

export const getSerchItems = (data, value) =>
  data.filter((item) =>
    item.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
  );
  
export const generateList = (
  searchTitles,
  savedItems,
  { onSelect, onRemove }
) => {
  const [rezArr, len] = generateSearchItemsArray(searchTitles, savedItems);
  return rezArr.slice(0, 10).map((title, ind) =>
    ind < len ? (
      <li
        key={title + ind}
        className="memory-item"
        onMouseDown={(e) => onSelect(e, title)}
      >
        {title}
        <span onMouseDown={(e) => onRemove(e, title)}>&#x2715;</span>
      </li>
    ) : (
      <li key={title + ind} onMouseDown={(e) => onSelect(e, title)}>
        {title}
      </li>
    )
  );
};
