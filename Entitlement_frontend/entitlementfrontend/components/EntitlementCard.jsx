// components/EntitlementCard.jsx
import React from 'react';
import Link from 'next/link';
import styles from '../public/styles/EntitlementCard.module.css';

const EntitlementCard = ({ entitlement }) => {
  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'FULFILLED':
        return styles.fulfilled;
      case 'PENDING':
        return styles.pending;
      case 'CANCELED':
        return styles.canceled;
      default:
        return '';
    }
  };

  return (
    <Link href={`/entitlements/${entitlement.entitlementID}`}>
      <div className={styles.card}>
        <div className={`${styles.statusBadge} ${getStatusColor(entitlement.status)}`}>
          {entitlement.status}
        </div>
        
        <div className={styles.cardHeader}>
          <h3>ID: {entitlement.entitlementID}</h3>
          <div className={styles.sku}>{entitlement.sku}</div>
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Product:</span>
            <span>{entitlement.product_type || 'N/A'}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>Start Date:</span>
            <span>{formatDate(entitlement.start_date)}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>End Date:</span>
            <span>{formatDate(entitlement.end_date)}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>Quantity:</span>
            <span>{entitlement.quantity}</span>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.viewDetails}>View Details →</div>
        </div>
      </div>
    </Link>
  );
};

export default EntitlementCard;