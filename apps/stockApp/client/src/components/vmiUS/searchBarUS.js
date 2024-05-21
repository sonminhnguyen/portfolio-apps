import React, { useState, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getSymbolList } from "./dataUS";
import vmiContext from "../../context/vmi-context";

const SearchBar = ({ setSymbol }) => {
  const { setShowError, setMessageError } = useContext(vmiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    getSymbolList(searchTerm.toUpperCase())
      .then((data) => {
        if (data) {
          setQuotes(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        setMessageError("Server not respond for searching. Please try again later!")
      });
  };

  const handleSelect = (e) => quotes.length !== 0 && setSymbol(e[0]?.symbol);

  return (
    <>
      <AsyncTypeahead
        delay={1000}
        id="search-symbol-US"
        labelKey="symbol"
        isLoading={isLoading}
        minLength={0}
        onSearch={(searchTerm) => handleSearch(searchTerm)}
        onChange={handleSelect}
        options={quotes}
        placeholder="Enter a symbol"
        renderMenuItemChildren={(option, props) => (
          <ListGroup horizontal="sm">
            <ListGroup.Item>{option?.symbol}</ListGroup.Item>
            <ListGroup.Item>{option?.name}</ListGroup.Item>
            <ListGroup.Item className="ml-auto">
              {option?.exchangeShortName}
            </ListGroup.Item>
          </ListGroup>
        )}
      />
    </>
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
