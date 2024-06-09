import { create } from 'zustand';

type ControlState = {
  expandedItems: string[],
  setExpandedItems: (items: string[]) => void;
}

export const useControl = create<ControlState>((set) => ({
  expandedItems: [],
  setExpandedItems: (expandedItems: string[]) => { set({ expandedItems }) },
}));