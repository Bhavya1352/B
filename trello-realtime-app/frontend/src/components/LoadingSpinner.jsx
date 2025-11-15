import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: 'white',
      textAlign: 'center'
    }}>
      <div className="loading-spinner" style={{ marginBottom: '16px' }}></div>
      <p style={{ 
        fontSize: '1.1rem', 
        fontWeight: '500',
        background: 'rgba(255,255,255,0.9)',
        color: '#172B4D',
        padding: '8px 16px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;