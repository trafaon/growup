import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';

export function GoalScreen() {
    const navigate = useNavigate();
    const [goal, setGoal] = useState("");
    const [successIndicators, setSuccessIndicators] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-center text-green-600 mb-8">
                    What is your goal?
                </h1>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <FormField
                        label="Define your objective:"
                        placeholder="Enter your goal here..."
                        value={goal}
                        onChange={setGoal}
                    />

                    <FormField
                        label="Success indicators:"
                        placeholder="How will you measure success?"
                        value={successIndicators}
                        onChange={setSuccessIndicators}
                        multiline
                    />

                    <Button
                        onClick={() => navigate('/reality')}
                        variant="primary"
                        className="w-full bg-green-500 hover:bg-green-600"
                    >
                        Next: Current Reality
                    </Button>
                </div>
            </div>
        </div>
    );
}