/**
 * Loading spinner component
 */
const LoadingSpinner = ({ size = "medium", color = "pink" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };
  
  const colorClasses = {
    pink: "text-pink-600",
    purple: "text-purple-600",
    blue: "text-blue-600"
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;