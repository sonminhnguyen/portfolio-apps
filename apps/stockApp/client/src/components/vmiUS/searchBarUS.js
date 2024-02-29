import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getSymbolList } from "./dataUS";

const SearchBar = ({ setSymbol }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (searchTerm) => {
    const options = await getSymbolList(searchTerm.toUpperCase());
    try {
      setOptions(options);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelect = (e) => e.length !== 0 && setSymbol(e[0].symbol);

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      delay={500}
      filterBy={filterBy}
      id="search-symbol-US"
      isLoading={isLoading}
      onChange={handleSelect}
      labelKey="symbol"
      minLength={1}
      onSearch={(searchTerm) => handleSearch(searchTerm)}
      options={options}
      placeholder="Enter a symbol"
      renderMenuItemChildren={(option, props) => (
        <ListGroup horizontal="sm">
          <ListGroup.Item>{option.symbol}</ListGroup.Item>
          <ListGroup.Item>{option.name}</ListGroup.Item>
          <ListGroup.Item className="ml-auto">
            {option.exchangeShortName}
          </ListGroup.Item>
        </ListGroup>
      )}
    />
  );
};

export default SearchBar;

//   const [searchTerm, setSearchTerm] = useState("");
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       setIsLoading(true);
//       handleSearch(debouncedSearchTerm);
//       setIsLoading(false);
//     }
//   }, [debouncedSearchTerm]);

//   onSearch={(searchTerm) => setSearchTerm(searchTerm)}

// function useDebounce(value, delay) {
//   // State and setters for debounced value
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(
//     () => {
//       // Update debounced value after delay
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);
//       // Cancel the timeout if value changes (also on delay change or unmount)
//       // This is how we prevent debounced value from updating if value is changed ...
//       // .. within the delay period. Timeout gets cleared and restarted.
//       return () => {
//         clearTimeout(handler);
//       };
//     },
//     [value, delay] // Only re-call effect if value or delay changes
//   );
//   return debouncedValue;
// }
