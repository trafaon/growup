import { GoalData, RealityData, OptionData, ActionItem } from '../types/grow';

export const validateGoal = (goal: Partial<GoalData>): string[] => {
  const errors: string[] = [];
  if (!goal.objective?.trim()) {
    errors.push('Objective is required');
  }
  if (!goal.successIndicators?.trim()) {
    errors.push('Success indicators are required');
  }
  return errors;
};

export const validateReality = (reality: Partial<RealityData>): string[] => {
  const errors: string[] = [];
  if (!reality.currentSituation?.trim()) {
    errors.push('Current situation is required');
  }
  return errors;
};

export const validateOption = (option: Partial<OptionData>): string[] => {
  const errors: string[] = [];
  if (!option.description?.trim()) {
    errors.push('Description is required');
  }
  return errors;
};

export const validateActionItem = (item: Partial<ActionItem>): string[] => {
  const errors: string[] = [];
  if (!item.description?.trim()) {
    errors.push('Description is required');
  }
  if (!item.dueDate) {
    errors.push('Due date is required');
  }
  return errors;
};