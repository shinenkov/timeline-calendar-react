import React from 'react';

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
      className={`input${className ? ' ' + className : ''}`}
      style={{
        background: 'transparent',
        minWidth: '200px',
        height: '30px',
        width: '100%',
        ...style,
      }}
      data-testid={dataTestid}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
