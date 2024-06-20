import { create } from 'zustand';

type KeywordState = {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const useKeyword = create<KeywordState>((set) => ({
  keyword: '',
  setKeyword: (keyword: string) => { set({ keyword })},
}))