import React, { useState, useEffect } from "react";

const Notification = ({ message, isError }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Adjust the duration as needed
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center mt-16">
      {isVisible && (
        <div className={`${isError ? 'text-google' : 'text-success'} font-semibold px-4 py-2 rounded-md shadow-lg transition-all duration-500 transform translate-y-0`}>
          {message}
        </div>
      )}
    </div>);
};

export default Notification;
