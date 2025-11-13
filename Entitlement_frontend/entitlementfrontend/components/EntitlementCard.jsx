// components/EntitlementCard.jsx
import React from 'react';
import Link from 'next/link';
import styles from '../public/styles/EntitlementCard.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled, { css, useTheme } from 'styled-components';


export const EntitlementCardSkeleton = () => {
  const { color } = useTheme();
  return (
    /* @ts-expect-error wrong types! */
    <SkeletonTheme color={color.skeletonBase} highlightColor={color.skeletonHighlight}>
      <div className={styles.card} style={{ padding: '1.5rem' }}>
        <div className={styles.statusBadge} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <Skeleton width="80px" height="20px" />
        </div>
        
        <div className={styles.cardHeader}>
          <h3 style={{ marginBottom: '0.5rem' }}>
            <Skeleton width="150px" height="25px" />
          </h3>
          <div className={styles.sku}>
            <Skeleton width="100px" height="16px" />
          </div>
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.infoRow}>
            <span className={styles.label}>
              <Skeleton width="70px" height="16px" />
            </span>
            <span>
              <Skeleton width="100px" height="16px" />
            </span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>
              <Skeleton width="80px" height="16px" />
            </span>
            <span>
              <Skeleton width="110px" height="16px" />
            </span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>
              <Skeleton width="70px" height="16px" />
            </span>
            <span>
              <Skeleton width="90px" height="16px" />
            </span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>
              <Skeleton width="75px" height="16px" />
            </span>
            <span>
              <Skeleton width="50px" height="16px" />
            </span>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.viewDetails}>
            <Skeleton width="120px" height="16px" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

const EntitlementCard = ({ entitlement, isLoading = false } ) => {
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

  if (isLoading) {
    return <EntitlementCardSkeleton />;
  }

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