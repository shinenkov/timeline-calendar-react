import React from 'react';
import styles from './input.module.css';

type InputProps = {
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: string;
  label: string;
  className?: string;
  dataTestid?: string;
  style?: React.CSSProperties;
};

function Input({
  onChange,
  value,
  label,
  className,
  dataTestid,
  style,
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={label}
      className={`${styles.input}${className ? ' ' + className : ''}`}
      style={{
        ...style,
      }}
      data-testid={dataTestid}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
