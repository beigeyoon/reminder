import { create } from 'zustand';
import { Item } from '../common/types';

type ControlState = {
  expandedItems: string[],
  setExpandedItems: (items: string[]) => void;
}

export const useControl = create<ControlState>((set) => ({
  expandedItems: [],
  setExpandedItems: (expandedItems: string[]) => { set({ expandedItems }) },
}));