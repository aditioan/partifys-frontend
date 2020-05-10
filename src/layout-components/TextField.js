import React from 'react';
import styles from './text-field.module.css';

export default function TextField({ type, name, placeholder }) {
  return (
      <input type={type} name={name} className={`${styles.inputLogin} ${styles.iconKey}`} placeholder={placeholder} />
  );
}