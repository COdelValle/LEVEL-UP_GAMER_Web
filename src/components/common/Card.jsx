import React from 'react';

// Componente Card ligero usado por tests y por algunas partes de la UI.
// Exportamos como named export `Card` para mantener compatibilidad con pruebas existentes.
export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card-component ${className}`} data-testid="card-component">
      {children}
    </div>
  );
};

export default Card;
