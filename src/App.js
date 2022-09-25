import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect, useRef } from "react";

import useApi from "./hooks/useApi";

import Search from "./components/Search/Search";
import Card from "./components/Card/Card";

function App() {
    const api = `https://api.unsplash.com/search/?client_id=tuL8C9ksQ7vXPp-J0r3JW6i0jpBq_jkDy0GtdnUoUR8`;
    const [pageNumber, updatePageNumber] = useState(1);
    const [search, setSearch] = useState('girls');

    const [apiUrl, setApi] = useState(`${api}&page=1&query=girls`);
    const [{ data, isLoading }, setUrl] = useApi(apiUrl, {});

    const { photos:{results} = [] } = data;
    const [ images, setImages] = useState(data);

    const observer = useRef();
    const lastItemRef = useRef();

    const incrementPage = () =>
    {
        updatePageNumber(pageNumber + 1);
        setUrl(`${api}&page=${pageNumber}&query=${search}`);
    };

    useEffect(() => {
        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                incrementPage();
            }
        };

        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastItemRef.current);

        return () => {
            observer.current.disconnect();
        };
    }, [data]);

    useEffect(() => {
        if (!isLoading)
        {
            setImages((images) => {
                console.log(images);
                return images.length ? [...images, ...results] : [...results];
            });
        }
    }, [data]);

    useEffect(() => {
        setImages([]);
        setSearch(search);
        setUrl(`${api}&page=${pageNumber}&query=${search}`);
    }, [search]);

    return (
      <div className="App">
          <h1 className="text-center mb-3">Images</h1>
          <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 col-12">
                      <div className="row">
                          <Card images={images} />
                          <div style={{height: 30 + 'px'}} ref={lastItemRef}></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default App;
