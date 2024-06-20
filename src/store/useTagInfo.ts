import { create } from 'zustand';
import { Tag } from '../common/types';

type TagInfoState = {
  tagInfo: Tag | null;
  setTagInfo: (tagInfo: Tag | null) => void;
}

export const useTagInfo = create<TagInfoState>((set) => ({
  tagInfo: null,
  setTagInfo: (tagInfo: Tag | null) => { set({ tagInfo })},
}));