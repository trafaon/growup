import React, { useState } from 'react';
import { Button } from './Button';

interface DynamicListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}

export function DynamicList({ label, items, onChange, addLabel }: DynamicListProps) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{label}</label>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="flex-1 p-2 bg-gray-50 rounded">{item}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Add new item..."
        />
        <Button
          onClick={handleAdd}
          variant="secondary"
        >
          {addLabel}
        </Button>
      </div>
    </div>
  );
}