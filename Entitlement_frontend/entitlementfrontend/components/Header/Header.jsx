// components/Header.jsx
import React from 'react';
import Link from 'next/link';
import styles from '../../public/styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <h1>Entitlement Manager</h1>
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/entitlements/new" className={styles.navLink}>
          Add Entitlement
        </Link>
      </nav>
    </div>
    </header>
  );
};

export default Header;