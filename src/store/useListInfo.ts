import { create } from 'zustand';
import { List, PresetList } from '../common/types';

type ListInfoState = {
  selectedList: List | PresetList | null,
  setSelectedList: (listInfo: List | PresetList) => void,
  lists: List[] | null,
  setLists: (lists: List[]) => void,
}

export const useListInfo = create<ListInfoState>((set) => ({
  selectedList: null,
  setSelectedList: (selectedList: List | PresetList) => { set({ selectedList }) },
  lists: null,
  setLists: (lists: List[]) => { set({ lists })},
}));