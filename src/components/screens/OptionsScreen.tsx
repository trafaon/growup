import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useGrowStore } from '../../hooks/useGrowStore';
import { OptionForm } from '../forms/OptionForm';
import { OptionsList } from '../lists/OptionsList';

export function OptionsScreen() {
  const navigate = useNavigate();
  const { options, addOption, removeOption } = useGrowStore(state => ({
    options: state.data.options || [],
    addOption: state.addOption,
    removeOption: state.removeOption
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-yellow-600 mb-8">
          Explore Your Options
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <OptionForm onSubmit={addOption} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <OptionsList options={options} onDelete={removeOption} />
          
          <Button
            onClick={() => navigate('/way-forward')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 mt-4"
          >
            Next: Way Forward
          </Button>
        </div>
      </div>
    </div>
  );
}