import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";

import Search from "./components/Search/Search";
import Card from "./components/Card/Card";

function App() {
    let [fetchedData, updateFetchedData] = useState([]);
    let { photos } = fetchedData;
    let [pageNumber, updatePageNumber] = useState(1);
    let [search, setSearch] = useState('girls');
    let api = `https://api.unsplash.com/search/?client_id=tuL8C9ksQ7vXPp-J0r3JW6i0jpBq_jkDy0GtdnUoUR8&page=${pageNumber}&query=${search}`

    useEffect(() => {
        (async function () {
            let data = await fetch(api).then((res) => res.json());
            updateFetchedData(data);
        })();
    }, [api]);

    //console.log(photos);

    return (
      <div className="App">
          <h1 className="text-center mb-3">Images</h1>
          <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 col-12">
                      <div className="row">
                          <Card results={photos} />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default App;
