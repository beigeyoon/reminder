import { create } from 'zustand';
import { List } from '../types';

type ListInfoState = {
  selectedList: List | null,
  setSelectedList: (listInfo: List) => void,
  lists: List[] | null,
  setLists: (lists: List[]) => void,
}

export const useListInfo = create<ListInfoState>((set) => ({
  selectedList: null,
  setSelectedList: (selectedList: List) => { set({ selectedList }) },
  lists: null,
  setLists: (lists: List[]) => { set({ lists })},
}));