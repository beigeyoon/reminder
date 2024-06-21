import { create } from 'zustand';
import { Tag } from '../common/types';

type ControlState = {
  expandedItems: string[],
  setExpandedItems: (items: string[]) => void;
  selectedTag: Tag | null;
  setSelectedTag: (selectedTag: Tag | null) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}

export const useControl = create<ControlState>((set) => ({
  expandedItems: [],
  setExpandedItems: (expandedItems: string[]) => { set({ expandedItems }) },
  selectedTag: null,
  setSelectedTag: (selectedTag: Tag | null) => { set({ selectedTag }) },
  searchKeyword: '',
  setSearchKeyword: (searchKeyword: string) => { set({ searchKeyword }) },
}));