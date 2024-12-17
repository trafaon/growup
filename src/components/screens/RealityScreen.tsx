import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { useGrowStore } from '../../hooks/useGrowStore';
import { DynamicList } from '../ui/DynamicList';

export function RealityScreen() {
  const navigate = useNavigate();
  const setReality = useGrowStore(state => state.setReality);
  const [currentSituation, setCurrentSituation] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);

  const handleSubmit = () => {
    setReality({ currentSituation, challenges });
    navigate('/options');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
          Current Reality
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <FormField
            label="Describe your current situation:"
            placeholder="Where are you now in relation to your goal?"
            value={currentSituation}
            onChange={setCurrentSituation}
            multiline
          />

          <DynamicList
            label="What challenges are you facing?"
            items={challenges}
            onChange={setChallenges}
            addLabel="Add Challenge"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
          >
            Next: Explore Options
          </Button>
        </div>
      </div>
    </div>
  );
}