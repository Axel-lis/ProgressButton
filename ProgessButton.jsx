import { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProgressButton = ({ hasError: externalHasError, ...props }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [internalHasError, setInternalHasError] = useState(false);

  const backgroundColor =
    internalHasError || externalHasError
      ? 'bg-red-500 hover:bg-red-600'
      : isCompleted
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-blue-500 hover:bg-blue-600';

  useEffect(() => {
    let progressInterval;

    if (isLoading && progress < 100) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 2;
          if (newProgress >= 100) {
            // Simulate random error (30% chance)
            const shouldError = Math.random() < 0.3;
            if (shouldError) {
              setInternalHasError(true);
              setIsLoading(false);
              setIsCompleted(false);
            } else {
              setIsCompleted(true);
              setIsLoading(false);
            }
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isLoading, progress]);

  const handleClick = () => {
    if (!isLoading && !isCompleted && !internalHasError) {
      setIsLoading(true);
      setProgress(0);
      setIsCompleted(false);
      setInternalHasError(false);
    } else if (isCompleted || internalHasError) {
      setIsLoading(false);
      setProgress(0);
      setIsCompleted(false);
      setInternalHasError(false);
    }
  };

  return (
    <button
      {...props}
      className={`relative min-w-[200px] h-12 px-6 py-2 rounded-lg font-medium text-white overflow-hidden transition-colors duration-300 ${backgroundColor}`}
      aria-live="polite"
      disabled={isLoading || internalHasError}
      onClick={handleClick}
    >
      <div
        className={`absolute left-0 top-0 h-full transition-all duration-300 ease-out ${
          internalHasError ? 'bg-red-100/20' : 'bg-white/20'
        }`}
        style={{ width: `${progress}%` }}
      />
      <div className="relative flex items-center justify-center gap-2">
        {internalHasError ? (
          <>
            <FaTimes className="text-white" />
            <span>Error</span>
          </>
        ) : isCompleted ? (
          <>
            <FaCheck className="text-white" />
            <span>Completed</span>
          </>
        ) : (
          <span>{isLoading ? 'Loading...' : 'Click to Start'}</span>
        )}
      </div>
    </button>
  );
};
ProgressButton.propTypes = {
  hasError: PropTypes.bool, // El prop `hasError` debe ser un booleano
};

export default ProgressButton;
