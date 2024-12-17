import React from 'react';
import { ActionItem } from '../../types/grow';

interface ActionItemsListProps {
  items: ActionItem[];
  onUpdateStatus: (id: string, status: ActionItem['status']) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

export function ActionItemsList({ items, onUpdateStatus, onDelete }: ActionItemsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium">{item.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={item.status}
              onChange={(e) => onUpdateStatus(item.id, e.target.value as ActionItem['status'])}
              className={`${statusColors[item.status]} px-3 py-1 rounded-full text-sm`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}