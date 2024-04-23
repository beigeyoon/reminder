import { create } from 'zustand';
import { List } from '../types';

type ListInfoState = {
  listInfo: List | null,
  setListInfo: (listInfo: List) => void,
}

export const useListInfo = create<ListInfoState>((set) => ({
  listInfo: null,
  setListInfo: (listInfo: List) => { set({ listInfo }) },
}));