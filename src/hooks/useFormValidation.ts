import { useState, useCallback } from 'react';

interface ValidationHook<T> {
  errors: string[];
  validateForm: (data: T) => boolean;
  clearErrors: () => void;
}

export function useFormValidation<T>(
  validator: (data: T) => string[]
): ValidationHook<T> {
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = useCallback((data: T): boolean => {
    const validationErrors = validator(data);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  }, [validator]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return { errors, validateForm, clearErrors };
}