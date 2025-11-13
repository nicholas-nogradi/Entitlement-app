// components/EntitlementDetail.jsx
import React from 'react';
import Link from 'next/link';
import styles from '../../public/styles/EntitlementDetail.module.css';

const EntitlementDetail = ({ entitlement }) => {
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

  if (!entitlement) {
    return <div className={styles.loading}>Loading entitlement details...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Entitlements
        </Link>
        <h1>Entitlement Details</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Entitlement ID: {entitlement.entitlementID}</h2>
          <div className={`${styles.statusBadge} ${getStatusColor(entitlement.status)}`}>
            {entitlement.status}
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.section}>
            <h3>Basic Information</h3>
            <div className={styles.grid}>
              <div className={styles.gridItem}>
                <div className={styles.label}>SKU</div>
                <div className={styles.value}>{entitlement.sku !== null ? entitlement.sku : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Product Type</div>
                <div className={styles.value}>{entitlement.product_type !== null ? entitlement.product_type : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Quantity</div>
                <div className={styles.value}>{entitlement.quantity !== null ? entitlement.quantity : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Unit of Measure</div>
                <div className={styles.value}>{entitlement.uom !== null ? entitlement.uom : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Term</div>
                <div className={styles.value}>{entitlement.term !== null ? entitlement.term : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Evaluation</div>
                <div className={styles.value}>{entitlement.is_eval === 1 ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Dates</h3>
            <div className={styles.grid}>
              <div className={styles.gridItem}>
                <div className={styles.label}>Ship Date</div>
                <div className={styles.value}>{formatDate(entitlement.ship_date)}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Start Date</div>
                <div className={styles.value}>{formatDate(entitlement.start_date)}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>End Date</div>
                <div className={styles.value}>{formatDate(entitlement.end_date)}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Activation Date</div>
                <div className={styles.value}>{formatDate(entitlement.activation_date)}</div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>References</h3>
            <div className={styles.grid}>
              <div className={styles.gridItem}>
                <div className={styles.label}>Entitlement Group ID</div>
                <div className={styles.value}>{entitlement.entitlement_group_ID !== null ? entitlement.entitlement_group_ID : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Entitlement Version</div>
                <div className={styles.value}>{entitlement.entitlement_version !== null ? entitlement.entitlement_version : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>CSP ID</div>
                <div className={styles.value}>{entitlement.csp_ID !== null ? entitlement.csp_ID : 'N/A'}</div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.label}>Source ID</div>
                <div className={styles.value}>{entitlement.source_ID !== null ? entitlement.source_ID : 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntitlementDetail;