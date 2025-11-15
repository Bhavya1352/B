import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '12px',
      color: 'white',
      fontWeight: '600',
      fontSize: '14px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
      transform: isVisible ? 'translateX(0)' : 'translateX(400px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, background: 'linear-gradient(135deg, #51cf66, #40c057)' };
      case 'error':
        return { ...baseStyle, background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)' };
      case 'info':
        return { ...baseStyle, background: 'linear-gradient(135deg, #667eea, #764ba2)' };
      default:
        return { ...baseStyle, background: 'linear-gradient(135deg, #51cf66, #40c057)' };
    }
  };

  return (
    <div style={getToastStyle()}>
      {message}
    </div>
  );
};

export default Toast;