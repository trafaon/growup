import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { ActionItem } from '../../types/grow';

interface ActionItemFormProps {
  onSubmit: (item: ActionItem) => void;
}

export function ActionItemForm({ onSubmit }: ActionItemFormProps) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (description.trim() && dueDate) {
      onSubmit({
        id: Date.now().toString(),
        description: description.trim(),
        dueDate,
        status: 'pending'
      });
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        label="Action Description"
        placeholder="What needs to be done?"
        value={description}
        onChange={setDescription}
      />

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Add Action Item
      </Button>
    </div>
  );
}