import React, { useState, useEffect } from 'react';
import { getBooks } from '../../services/bookService';
import './home.scss';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(response => {
      setBooks(response);
      console.log(response);
    });
  }, []);

  return (
    <>
      <main>
        <section className='filterContainer'>
          <div>
            <label>Filter by page</label>
            <input type='range' min='0' max='1000' step='10' />
          </div>
          <div>
            <label>Filter by genre</label>
            <select name=''>
              <option value={''}>All</option>
            </select>
          </div>
        </section>
        <section className='cardContainer'>
          {books.length > 0 ? (
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
