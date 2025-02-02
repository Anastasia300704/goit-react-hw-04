import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search term');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images and photos"
          className={styles.input}
          autoFocus
          autoComplete="off"
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
