// components/Layout.jsx
import React from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import styles from '../public/styles/Layout.module.css';

const Layout = ({ children, title = 'Entitlement Manager' }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Entitlement management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Entitlement Manager</p>
      </footer>
    </div>
  );
};

export default Layout;