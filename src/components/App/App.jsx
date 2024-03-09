import React, { useState, useEffect } from 'react';
import Card from '../Card/Card.jsx';
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [PIXABY_API_KEY, setPIXABY_API_KEY] = useState(import.meta.env.VITE_PIXABY);

  const handleSearch = () => {
    setIsLoading(true);
    getImages(perPage);
  }

  const getImages = (perPage) => {
    let formatedSearch = search.replace(/ /g, "+");
    fetch(`https://pixabay.com/api/?key=${PIXABY_API_KEY}&q=${formatedSearch}&image_type=photo&per_page=${perPage}`)
      .then(response => response.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }

  const changeItemsPerPage = (event) => {
    const selectedValue = parseInt(event.target.value);
    console.log(selectedValue);
    setPerPage(selectedValue);
    getImages(selectedValue);
  }

  useEffect(() => {
    getImages(perPage);
  }, []);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="search-wrapper">
            <a className="navbar-brand" href="#">Images</a>
            <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
          <div className="per-page-wrapper">
            <span>
              Images per page: 
            </span>
            <select className="form-select" aria-label="Default select example" onChange={changeItemsPerPage}>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="70">70</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </nav>

      <div className="wrapper">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {images.map((item, index) => (
          <Card id={index} image={item.largeImageURL}/>
        ))}
      </div>

    </>
  );
}

export default App;
