import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { DynamicList } from '../ui/DynamicList';
import { Button } from '../ui/Button';
import { OptionData } from '../../types/grow';

interface OptionFormProps {
  onSubmit: (option: OptionData) => void;
}

export function OptionForm({ onSubmit }: OptionFormProps) {
  const [description, setDescription] = useState('');
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);

  const handleSubmit = () => {
    if (description.trim()) {
      onSubmit({
        id: Date.now().toString(),
        description,
        pros,
        cons
      });
      setDescription('');
      setPros([]);
      setCons([]);
    }
  };

  return (
    <div>
      <FormField
        label="Option Description"
        placeholder="Describe your option..."
        value={description}
        onChange={setDescription}
      />

      <DynamicList
        label="Pros"
        items={pros}
        onChange={setPros}
        addLabel="Add Pro"
      />

      <DynamicList
        label="Cons"
        items={cons}
        onChange={setCons}
        addLabel="Add Con"
      />

      <Button onClick={handleSubmit} className="w-full mt-4">
        Add Option
      </Button>
    </div>
  );
}