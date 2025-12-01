const Card = ({ 
  children, 
  className = '', 
  hover = false,
  clickable = false,
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-md transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const clickableStyles = clickable ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;