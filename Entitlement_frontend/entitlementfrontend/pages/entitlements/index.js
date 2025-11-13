// pages/index.js
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar/SearchBar';
import EntitlementGrid from '../../components/EntitlementGrid/EntitlementGrid';
import { getEntitlements, searchEntitlements } from '../../lib/api';
import styles from '../../public/styles/Home.module.css';

export default function Home() {
  const [entitlements, setEntitlements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchEntitlements = async (page = 1) => {
    try {
      setIsLoading(true);
      const offset = (page - 1) * limit;
      const data = await getEntitlements(limit, offset);
      setEntitlements(data);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load entitlements. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchTerm, statusFilter) => {
    try {
      setIsLoading(true);
      setSearchTerm(searchTerm);
      if (statusFilter !== undefined) {
        setStatusFilter(statusFilter);
      }
      
      // Build filter string based on search term and status
      let filterString = '';
      if (searchTerm) {
        filterString += `sku contains "${searchTerm}" OR product_type contains "${searchTerm}"`;
      }
      
      if (statusFilter) {
        if (filterString) {
          filterString += ' AND ';
        }
        filterString += `status="${statusFilter}"`;
      }
      
      let data;
      if (filterString) {
        data = await searchEntitlements(filterString);
      } else {
        data = await getEntitlements(limit, 0);
      }
      
      setEntitlements(data);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to search entitlements. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchEntitlements(page);
  };

  useEffect(() => {
    fetchEntitlements();
  }, []);

  return (
    <Layout title="Entitlement Manager - Dashboard">
      <div className={styles.container}>
        <h1 className={styles.title}>Entitlements Dashboard</h1>
        
        <SearchBar 
          onSearch={handleSearch} 
          initialSearchTerm={searchTerm} 
          initialStatus={statusFilter}
        />
        
        {isLoading ? (
          <div className={styles.loading}>Loading entitlements...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <EntitlementGrid 
            entitlements={entitlements} 
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
}