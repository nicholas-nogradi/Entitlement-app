// pages/entitlements/new.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { createEntitlement } from '../../lib/api';
import styles from '../../public/styles/NewEntitlement.module.css';

export default function NewEntitlementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sku: '',
    product_type: '',
    quantity: 1,
    start_date: '',
    end_date: '',
    status: 'PENDING',
    term: '',
    is_eval: false,
    uom: '',
    csp_ID: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Convert quantity to number
      const dataToSubmit = {
        ...formData,
        quantity: parseInt(formData.quantity, 10)
      };
      
      const response = await createEntitlement(dataToSubmit);
      
      // Redirect to the detail page of the newly created entitlement
      router.push(`/`);
    } catch (err) {
      setError('Failed to create entitlement. Please try again.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Create New Entitlement">
      <div className={styles.container}>
        <h1 className={styles.title}>Create New Entitlement</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="sku" className={styles.label}>SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="product_type" className={styles.label}>Product Type *</label>
              <input
                type="text"
                id="product_type"
                name="product_type"
                value={formData.product_type}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="quantity" className={styles.label}>Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="start_date" className={styles.label}>Start Date *</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="end_date" className={styles.label}>End Date *</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="status" className={styles.label}>Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="PENDING">Pending</option>
                <option value="FULFILLED">Fulfilled</option>
                <option value="CANCELED">Canceled</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="term" className={styles.label}>Term</label>
              <input
                type="text"
                id="term"
                name="term"
                value={formData.term}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="uom" className={styles.label}>Unit of Measure</label>
              <input
                type="text"
                id="uom"
                name="uom"
                value={formData.uom}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="csp_ID" className={styles.label}>CSP ID</label>
              <input
                type="text"
                id="csp_ID"
                name="csp_ID"
                value={formData.csp_ID}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="is_eval"
                  name="is_eval"
                  checked={formData.is_eval}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <label htmlFor="is_eval" className={styles.checkboxLabel}>
                  Evaluation
                </label>
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button 
              type="button" 
              onClick={() => router.push('/')}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Entitlement'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}