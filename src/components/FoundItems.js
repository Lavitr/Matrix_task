import React from "react";

const FoundItems = ({ items }) =>
  items.map((item, ind) => (
    <div key={item.title + ind} className="search-item">
      <a href="https://react.dev/" target="blank">
        {item.title}
      </a>
      <p>{item.Description}</p>
    </div>
  ));

export default FoundItems;
