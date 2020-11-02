import React, { useEffect, useState } from "react";
import { Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


async function fetchSearchEngine(query){
  const res = await fetch(`http://localhost:7700/indexes/docusaurus/search?q=${query}`);
  const docs = res.json();
  return docs;
}

function MySearch(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchData(searchTerm);
    }
  }, [searchTerm]);

  async function fetchData(query) {
    console.log(query)
    const res = await fetchSearchEngine(query);
    const docs = res.hits  
    const docsInSearchResultForm = docs.map(doc => {
      return {
        key: doc.id,
        as: Link,
        to: `${doc.permalink}`,
        title: doc.title,
        description: doc.description,
      };
    });

    setDocs(docsInSearchResultForm);
  }

  function handleSearchChange(e, { value }) {
    setSearchTerm(value);
  }

  return (
    <Search
      placeholder={"Search for docs..."}
      onResultSelect={() => setSearchTerm("")}
      onSearchChange={handleSearchChange}
      results={docs}
      value={searchTerm}
    />
  );
}

export default MySearch;
