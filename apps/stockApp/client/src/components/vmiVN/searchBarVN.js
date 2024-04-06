import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getSymbolListVN } from "./utils/api";

const SearchBar = ({ setSymbol }) => {
  const [isLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const options = await getSymbolListVN(
        searchTerm,
        process.env.REACT_APP_FIREANT_KEY
      );
      setOptions(options);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSelect = (e) => {
    e.length !== 0 && setSymbol(e[0]?.key)
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      delay={500}
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      onChange={handleSelect}
      labelKey="key"
      minLength={1}
      onSearch={(searchTerm) => handleSearch(searchTerm)}
      options={options}
      placeholder="Enter a symbol"
      renderMenuItemChildren={(option, props) => (
        <ListGroup horizontal={true}>
          <ListGroup.Item>{option.key}</ListGroup.Item>
          <ListGroup.Item>{option.name}</ListGroup.Item>
          <ListGroup.Item className="ml-auto">
            {option.description}
          </ListGroup.Item>
        </ListGroup>
      )}
    />
  );
};

export default SearchBar;
