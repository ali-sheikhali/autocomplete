import React, { useState, useEffect } from "react";
import { getPosts } from "../api/posts";

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

  const handleClick=(v)=>{
    setQuery(v)
    setBoxOptions([])
  }
  return (
    <div>
      <div>
        <input type="text" value={query} onChange={handleChange} />
      </div>
      {boxOptions.length > 0 && (
        <div>
          <ul>
            {boxOptions.map((item) => (
              <li onClick={()=>handleClick(item.title)}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
