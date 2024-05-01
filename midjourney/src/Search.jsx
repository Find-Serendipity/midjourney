import { useState } from "react";

export const Search = ({ setImageData }) => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bool, setBool] = useState(false);

  const noDefault = (event) => {
    event.preventDefault();
  };

  async function handleSearch(event) {
    event.preventDefault();
    const search = bool ? searchQuery.join(" AND ") : searchQuery.join(" OR ");
    try {
      const apiResponse = await fetch(
        `https://kuze.neon-sole.ts.net/images?search=${search}`
      );

      let jsonHolder = await apiResponse.json();

      setImageData(jsonHolder);
      setSearchQuery([]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>your search cloud</h2>
      <div className="currentSearch">
        <div className="searchBubbles">
          {searchQuery.map((term) => (
            <div key={term} className="bubbles">
              <div className="termCloud">{term}</div>
              <button
                className="closeX buttonShape"
                onClick={(e) => {
                  noDefault(e);
                  setSearchQuery(
                    searchQuery.filter((eachTerm) => eachTerm !== term)
                  );
                }}
              >
                <div className="xButton">-</div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="formBox">
        <form onSubmit={handleSearch}>
          <label>
            <br />
            <textarea
              type="textarea"
              rows="2"
              cols="35"
              placeholder={
                searchQuery.length > 0
                  ? "continue your search"
                  : "start your search here"
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  noDefault(e);
                  if (!searchQuery.includes(searchTerm)) {
                    setSearchQuery(searchQuery.concat(searchTerm));
                  }
                  setSearchTerm("");
                }
              }}
            />
            <br />
            <button
              className="addTerms buttonShape"
              onClick={(e) => {
                noDefault(e);
                if (!searchQuery.includes(searchTerm)) {
                  setSearchQuery(searchQuery.concat(searchTerm));
                }
                setSearchTerm("");
              }}
            >
              Add Search Term
            </button>
          </label>

          <label>
            include all terms in results?
            <input
              type="checkbox"
              value={bool}
              onChange={(e) => setBool(e.target.value)}
            />
          </label>

          <input className="submit buttonShape" type="submit" />
        </form>
      </div>
    </>
  );
};
