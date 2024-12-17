export interface GoalData {
  objective: string;
  successIndicators: string;
}

export interface RealityData {
  currentSituation: string;
  challenges: string[];
}

export interface OptionData {
  id: string;
  description: string;
  pros: string[];
  cons: string[];
}

export interface ActionItem {
  id: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface WayForwardData {
  selectedOptions: string[];
  actionItems: ActionItem[];
  commitment: string;
}

export interface GrowData {
  goal: GoalData;
  reality: RealityData;
  options: OptionData[];
  wayForward: WayForwardData;
}