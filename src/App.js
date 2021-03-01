import { Fragment, useState } from "react";
import SearchBar from "material-ui-search-bar";
import "./App.css";
import { Container } from "@material-ui/core";
import Results from "./results";
import useHttpClient from "./hooks/useHttpClient";
import Pagination from "./components/pagination";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultPerPage = 10;

  const { sendRequest, isLoading } = useHttpClient();

  const submitHandler = async (newValue) => {
    setQuery(newValue);
    if (newValue.length > 1) {
      try {
        const responseData = await sendRequest(
          "https://byno.wawlabs.com/avx_wse?q=" + newValue
        );
        console.log(responseData);
        setResults(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5 py-5">
      <SearchBar
        className="mb-5"
        value={query}
        onChange={(newValue) => submitHandler(newValue)}
        placeholder="Arama..."
      />
      {isLoading && query.length > 1 && <div>Yükleniyor...</div>}
      {!isLoading && results.length > 0 && query.length > 1 && (
        <Fragment>
          <h4 className="text-primary mb-3">SONUÇLAR:</h4>
          <Results isLoading={isLoading} results={currentResults} />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            resultPerPage={resultPerPage}
            totalResults={results.length}
          />
        </Fragment>
      )}
    </Container>
  );
}

export default App;
