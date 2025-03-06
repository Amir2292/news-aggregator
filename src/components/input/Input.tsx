import React, {useCallback} from "react";

// Debounce function
const debounce = (func: (value: string) => void, delay: number) => {
  let timer: number;
  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(value), delay);
  };
};

interface InputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  delay?: number;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = "",
  onChange,
  delay = 500,
  className = "",
}) => {
  // eslint-disable-next-line
  const debouncedOnChange = useCallback(
    debounce((value: string) => onChange(value), delay),
    [onChange, delay]
  );

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => debouncedOnChange(e.target.value)}
      className={`p-2 mt-4 transition-all border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:border-none ${className}`}
    />
  );
};

export default Input;
