import { create } from 'zustand';

type ViewTypeState = {
  viewType: 'list' | 'class',
  setViewType: (viewType: 'list' | 'class') => void;
}

export const useViewType = create<ViewTypeState>((set) => ({
  viewType: 'list',
  setViewType: (viewType: 'list' | 'class') => { set({ viewType })}
}));