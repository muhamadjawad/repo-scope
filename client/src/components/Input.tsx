import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input-field" {...props} />
    </div>
  );
};

export default Input;
