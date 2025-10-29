// components/EntitlementGrid.jsx
import React from 'react';
import EntitlementCard from './EntitlementCard';
import Pagination from './Pagination';
import styles from '../public/styles/EntitlementGrid.module.css';

const EntitlementGrid = ({ entitlements, pagination, onPageChange }) => {
  const { data = [], total = 0, count = 0, limit = 20, offset = 0 } = entitlements || {};
  
  if (!data || data.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No entitlements found</h3>
        <p>Try adjusting your search criteria or check back later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.resultSummary}>
        Showing {offset + 1}-{offset + count} of {total} entitlements
      </div>
      
      <div className={styles.grid}>
        {data.map((entitlement) => (
          <EntitlementCard 
            key={entitlement.entitlementID} 
            entitlement={entitlement} 
          />
        ))}
      </div>
      
      <Pagination
        currentPage={Math.floor(offset / limit) + 1}
        totalPages={Math.ceil(total / limit)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default EntitlementGrid;