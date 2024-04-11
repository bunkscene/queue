import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  onSave: () => void;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, onSave, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
        <button onClick={onSave}>Save</button>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
