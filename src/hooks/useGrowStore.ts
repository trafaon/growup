import { create } from 'zustand';
import { GrowData } from '../types/grow';

interface GrowStore {
  data: Partial<GrowData>;
  setGoal: (goal: GoalData) => void;
  setReality: (reality: RealityData) => void;
  addOption: (option: OptionData) => void;
  removeOption: (id: string) => void;
  setWayForward: (wayForward: WayForwardData) => void;
}

export const useGrowStore = create<GrowStore>((set) => ({
  data: {},
  setGoal: (goal) => set((state) => ({ data: { ...state.data, goal } })),
  setReality: (reality) => set((state) => ({ data: { ...state.data, reality } })),
  addOption: (option) => set((state) => ({
    data: {
      ...state.data,
      options: [...(state.data.options || []), option]
    }
  })),
  removeOption: (id) => set((state) => ({
    data: {
      ...state.data,
      options: state.data.options?.filter(opt => opt.id !== id) || []
    }
  })),
  setWayForward: (wayForward) => set((state) => ({ data: { ...state.data, wayForward } })),
}));