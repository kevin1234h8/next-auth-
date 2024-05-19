"use client";

import { useState } from "react";

export const SearchComponent = ({ data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchResults, setPrevSearchResults] = useState<any>([]);
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isToggleActive, setIsToggleActive] = useState(false); // Assuming it starts as inactive
  const [filterResults, setFilterResults] = useState<any>([]);
  console.log(isToggleActive);
  const handleToggle = () => {
    setIsToggleActive(!isToggleActive); // Toggles the state
  };
  function clearCookie(name: any) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Function to update the previous search results based on the toggle state
  function getPreviousResultFromCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "prevResult") {
        try {
          return JSON?.parse(value);
        } catch (error) {
          console.error("Error parsing JSON from cookie:", error);
          return null; // Return null in case of a parsing error
        }
      }
    }
    return null; // Return null if the "prevResult" cookie is not found
  }

  const handleSearch = () => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const filter = data.filter((item: any) => item.includes(searchTerm));
      setSearchResults(filter);
      console.log(searchResults.length);
      console.log("before ", prevSearchResults);
      if (isToggleActive) {
        if (searchResults.length > 0) {
          setPrevSearchResults([...prevSearchResults, ...searchResults]);
          console.log("middle", prevSearchResults);
        }
        // console.log("after", prevSearchResults);
        // console.log("prevSearchResults", prevSearchResults);
        const uniqueData = [...new Set(prevSearchResults)];
        // console.log("uniqueData", uniqueData);
        const prevResultJSON = JSON.stringify(uniqueData);
        document.cookie = `prevResult=${prevResultJSON}; expires=Thu, 31 Dec 2023 23:59:59 UTC; path=/`;
        const prevResult = getPreviousResultFromCookie();
        console.log(prevResult);
        const filteredData = data.filter(
          (item: never) => !prevResult.includes(item)
        );
        const uniqueFilteredResults = [
          ...new Set(
            filteredData.filter((item: any) => item.includes(searchTerm))
          ),
        ];
        //   console.log("filteredData", filteredData);
        //   console.log(prevSearchResults);
        setFilterResults(uniqueFilteredResults);
      } else {
        const uniqueFilteredResults = [
          ...new Set(data.filter((item: any) => item.includes(searchTerm))),
        ];
        //   console.log("filteredData", filteredData);
        //   console.log(prevSearchResults);
        setFilterResults(uniqueFilteredResults);
      }

      //   const combinedArray = data.concat(prevSearchResults);

      //   // Use a Set to ensure uniqueness and remove duplicates
      //   const uniqueSet = new Set(combinedArray);

      //   // Convert the Set back to an array
      //   const uniqueData = Array.from(uniqueSet);
      //   console.log("uniqueData", uniqueData);
      //   console.log("uniqueSet", uniqueSet);

      // Set the cookie with the previous result
    }
  };

  //   console.log("searchResults", searchResults);
  return (
    <div className="flex items-center justify-center flex-col">
      <div>data : {data.join(", ")}</div>
      <div>Search</div>
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex items-center justify-center gap-4">
        <button onClick={handleSearch}>Submit</button>
        <button onClick={() => clearCookie("prevResult")}>Clear Filter</button>
        <label>
          Toggle Filter
          <input
            type="checkbox"
            checked={isToggleActive}
            onChange={handleToggle}
          />
        </label>
      </div>
      <ul>
        {filterResults.map((result: any, index: number) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};
