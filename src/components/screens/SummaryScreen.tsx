import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useGrowStore } from '../../hooks/useGrowStore';
import { ActionItemsList } from '../lists/ActionItemsList';
import { OptionsList } from '../lists/OptionsList';

export function SummaryScreen() {
  const navigate = useNavigate();
  const data = useGrowStore(state => state.data);
  const selectedOptions = data.options?.filter(opt => 
    data.wayForward?.selectedOptions.includes(opt.id)
  ) || [];

  const handleUpdateStatus = (id: string, status: ActionItem['status']) => {
    // In a real app, you'd update the store here
    console.log('Update status:', id, status);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
          Your PDI Summary
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Goal</h2>
            <p className="text-lg mb-2">{data.goal?.objective}</p>
            <p className="text-gray-600">{data.goal?.successIndicators}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Current Reality</h2>
            <p className="text-lg mb-4">{data.reality?.currentSituation}</p>
            {data.reality?.challenges.length ? (
              <div>
                <h3 className="font-medium mb-2">Challenges:</h3>
                <ul className="list-disc list-inside">
                  {data.reality.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">Selected Options</h2>
            <OptionsList
              options={selectedOptions}
              onDelete={() => {}}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-orange-600 mb-4">Action Plan</h2>
            {data.wayForward?.actionItems && (
              <ActionItemsList
                items={data.wayForward.actionItems}
                onUpdateStatus={handleUpdateStatus}
                onDelete={() => {}}
              />
            )}
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Your Commitment:</h3>
              <p className="text-gray-700">{data.wayForward?.commitment}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="secondary"
              className="flex-1"
            >
              Start New PDI
            </Button>
            <Button
              onClick={() => window.print()}
              className="flex-1 bg-purple-500 hover:bg-purple-600"
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}