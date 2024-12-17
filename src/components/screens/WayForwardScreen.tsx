import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { useGrowStore } from '../../hooks/useGrowStore';
import { OptionsList } from '../lists/OptionsList';
import { ActionItemForm } from '../forms/ActionItemForm';
import { ActionItemsList } from '../lists/ActionItemsList';
import { ActionItem } from '../../types/grow';

export function WayForwardScreen() {
  const navigate = useNavigate();
  const { options, setWayForward } = useGrowStore(state => ({
    options: state.data.options || [],
    setWayForward: state.setWayForward
  }));

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [commitment, setCommitment] = useState('');

  const handleToggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) 
        ? prev.filter(optId => optId !== id)
        : [...prev, id]
    );
  };

  const handleAddActionItem = (item: ActionItem) => {
    setActionItems(prev => [...prev, item]);
  };

  const handleUpdateStatus = (id: string, status: ActionItem['status']) => {
    setActionItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleDeleteActionItem = (id: string) => {
    setActionItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    setWayForward({
      selectedOptions,
      actionItems,
      commitment
    });
    navigate('/summary');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-8">
          Way Forward
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Select Options to Pursue</h2>
            <OptionsList
              options={options}
              onDelete={() => {}}
              selectable
              selectedIds={selectedOptions}
              onToggleSelect={handleToggleOption}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Action Plan</h2>
            <ActionItemForm onSubmit={handleAddActionItem} />
            {actionItems.length > 0 && (
              <div className="mt-4">
                <ActionItemsList
                  items={actionItems}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteActionItem}
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <FormField
              label="Your Commitment"
              placeholder="What do you commit to doing to achieve your goal?"
              value={commitment}
              onChange={setCommitment}
              multiline
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Next: Review Summary
          </Button>
        </div>
      </div>
    </div>
  );
}