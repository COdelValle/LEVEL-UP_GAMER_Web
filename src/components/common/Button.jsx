const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-azul-electrico to-azul-claro text-white hover:scale-105 hover:shadow-lg hover:shadow-azul-electrico/40 focus:ring-azul-electrico',
    secondary: 'border-2 border-azul-electrico text-azul-electrico hover:bg-azul-electrico hover:text-white focus:ring-azul-electrico',
    outline: 'border-2 border-gray-600 text-gray-300 hover:border-azul-electrico hover:text-azul-electrico focus:ring-azul-electrico'
  };
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();
  
  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;