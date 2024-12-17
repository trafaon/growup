import React from 'react';

interface ErrorMessageProps {
  errors: string[];
}

export function ErrorMessage({ errors }: ErrorMessageProps) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
      {errors.length === 1 ? (
        <p>{errors[0]}</p>
      ) : (
        <ul className="list-disc list-inside">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}