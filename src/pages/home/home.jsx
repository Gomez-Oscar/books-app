import React, { useState, useEffect } from 'react';
import { getBooks } from '../../services/bookService';
import './home.scss';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filterResult, setFitlerResult] = useState([]);
  const [responseFilter, setResponseFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [rangePages, setRangePages] = useState({
    min: 0,
    max: 1000,
    step: 10,
  });

  const [filters, setFilters] = useState({});

  useEffect(() => {
    getBooks().then(response => {
      setBooks(response);
      // console.log(response);
      const categoriesList = getCategories(response);
      setCategories(categoriesList);
      const range = getPages(response);
      setRangePages({
        ...rangePages,
        ...range,
      });
    });
  }, []);

  // function to extract categories

  const getCategories = bookList => {
    const categoryList = bookList.map(item => item.book.genre);
    const categoryItems = [...new Set(categoryList)];
    return categoryItems;
    // console.log(categoryItems);
  };

  // function to extract max and min pages

  const getPages = bookList => {
    const range = bookList.map(item => item.book.pages);

    return {
      min: Math.floor(Math.min(...range) / 1000) * 1000,
      max: Math.ceil(Math.max(...range) / 1000) * 1000,
    };
  };

  // filter function

  const onFilter = event => {
    const { name, value } = event.target;
    const filterParams = {
      ...filters,
      [name]: value,
    };
    setFilters(filterParams);
    // console.log(filterParams);

    if (value) {
      let booksCopy = [...books];
      let filteredBooks = [];
      for (const key in filterParams) {
        if (filterParams[key]) {
          const filteredResult =
            key === 'pages'
              ? booksCopy.filter(
                  element => element.book[key] <= filterParams[key]
                )
              : booksCopy.filter(
                  element => element.book[key] === filterParams[key]
                );
          filteredBooks = [...filteredResult];
        }
      }
      // console.log(filteredBooks);
      setFitlerResult(filteredBooks);
      setResponseFilter(() =>
        filteredBooks.length > 0 ? '' : 'No hay resultados'
      );
    } else {
      setFitlerResult([]);
      setResponseFilter('Filtros limpiados');
    }
  };

  return (
    <>
      <main>
        <section className='filterContainer'>
          <div>
            <label>Filtrar por página</label>
            <input
              type='range'
              name='pages'
              value={filters.pages}
              min={rangePages.min}
              max={rangePages.max}
              step={rangePages.step}
              onChange={onFilter}
            />
          </div>
          <div>
            <label>Filter by genre</label>
            <select name='genre' value={filters.genre} onChange={onFilter}>
              <option value={''}>Todos</option>
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
        </section>
        {responseFilter && <h2>{responseFilter}</h2>}
        <section className='cardContainer'>
          {filterResult.length > 0 ? (
            filterResult.map((item, index) => (
              <figure key={index}>
                <img src={item.book.cover} alt={item.book.title} />
              </figure>
            ))
          ) : books.length > 0 ? (
            books.map((item, index) => (
              <figure key={index}>
                <img src={item.book.cover} alt={item.book.title} />
              </figure>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
