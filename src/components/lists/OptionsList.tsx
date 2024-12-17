import React from 'react';
import { OptionData } from '../../types/grow';

interface OptionsListProps {
  options: OptionData[];
  onDelete: (id: string) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
}

export function OptionsList({ 
  options, 
  onDelete, 
  selectable = false,
  selectedIds = [],
  onToggleSelect
}: OptionsListProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start justify-between">
            {selectable && (
              <input
                type="checkbox"
                checked={selectedIds.includes(option.id)}
                onChange={() => onToggleSelect?.(option.id)}
                className="mt-1 mr-2"
              />
            )}
            <div className="flex-1">
              <p className="font-medium">{option.description}</p>
              
              {option.pros.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-green-600">Pros:</p>
                  <ul className="list-disc list-inside text-sm">
                    {option.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {option.cons.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-600">Cons:</p>
                  <ul className="list-disc list-inside text-sm">
                    {option.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {!selectable && (
              <button
                onClick={() => onDelete(option.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}