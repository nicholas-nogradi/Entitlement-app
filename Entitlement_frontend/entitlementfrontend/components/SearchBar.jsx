// components/SearchBar.jsx
import React, { useState } from 'react';
import styles from '../public/styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Search entitlements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <div className={styles.filters}>
        <select className={styles.select} onChange={(e) => onSearch(searchTerm, e.target.value)}>
          <option value="">All statuses</option>
          <option value="FULFILLED">Fulfilled</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELED">Canceled</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;