
interface CircleProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export const CircleProgress = ({ 
  value, 
  size = 120, 
  strokeWidth = 10 
}: CircleProgressProps) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;
  
  // Determine the color based on the score
  const getColor = () => {
    if (normalizedValue >= 80) return "#10B981"; // Green for high scores
    if (normalizedValue >= 60) return "#06B6D4"; // Cyan for good scores
    if (normalizedValue >= 40) return "#8B5CF6"; // Purple for medium scores
    if (normalizedValue >= 20) return "#F59E0B"; // Amber for low scores
    return "#EF4444"; // Red for very low scores
  };
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
      />
      
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={getColor()}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
      />
    </svg>
  );
};
