// pages/entitlements/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import EntitlementDetail from '../../components/EntitlementDetail';
import { getEntitlementById } from '../../lib/api';
import styles from '../../public/styles/EntitlementDetailPage.module.css';

export default function EntitlementDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [entitlement, setEntitlement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntitlement = async () => {
      if (!id) return; // Wait for the ID to be available
      
      try {
        setIsLoading(true);
        const response = await getEntitlementById(id);
        if (response.data) {
          setEntitlement(response.data);
        } else {
          throw new Error('No data received from API');
        }
      } catch (err) {
        setError('Failed to load entitlement details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }

      
    };

    fetchEntitlement();
    
  }, [id]);

  if (!id) {
    return null; // Don't render anything until we have an ID
  }

  return (
    <Layout title={`Entitlement ${id} - Details`}>
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loading}>Loading entitlement details...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <EntitlementDetail entitlement={entitlement} />
        )}
      </div>
    </Layout>
  );
}