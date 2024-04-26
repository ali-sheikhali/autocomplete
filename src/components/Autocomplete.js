import React, { useState, useEffect } from "react";
import { getPosts } from "../api/posts";
import "./autocomplete.css";

function Autocomplete() {

  const [data, setData] = useState([]);
  const [boxOptions, setBoxOptions] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getPosts().then((res) => {
      setData(res);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value === "") {
      setBoxOptions([]);
    } else {
      setBoxOptions(
        data.filter(
          (item) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
    }
  };
  const handleClick = (v) => {
    setQuery(v);
    setBoxOptions([]);
  };

  const handleDelete = () => {
    setQuery("");
    setBoxOptions([]);
  };

  return (
    <div className="autocomplete-container">
      <h1 className="header">Autocomplete Project</h1>
      <div className="input">
        <input
          type="text"
          placeholder="AutoComplete"
          value={query}
          onChange={handleChange}
        />
        <i
          onClick={handleDelete}
          className="fa-solid fa-delete-left delete"
        ></i>
      </div>
      {boxOptions.length > 0 && (
        <div className="autocomplete-box">
          <ul>
            {boxOptions.map((item) => (
              <li key={item.id} onClick={() => handleClick(item.title)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
