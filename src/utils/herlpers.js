export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const showMessage = (message, type = 'info') => {
  // Implementación de sistema de mensajes
  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;
  
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 350px;
  `;
  
  const colors = {
    success: 'linear-gradient(135deg, #39FF14, #1E90FF)',
    error: 'linear-gradient(135deg, #ff4444, #cc0000)',
    warning: 'linear-gradient(135deg, #ffaa00, #ff7700)',
    info: 'linear-gradient(135deg, #1E90FF, #39FF14)'
  };
  
  messageEl.style.background = colors[type] || colors.info;
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    messageEl.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        document.body.removeChild(messageEl);
      }
    }, 300);
  }, 3000);
};