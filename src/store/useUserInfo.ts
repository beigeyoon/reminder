import { create } from 'zustand';
import { User } from '../common/types';

type UserInfoState = {
  userInfo: User | null,
  setUserInfo: (userInfo: User) => void,
}

export const useUserInfo = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: User) => { set({ userInfo }) },
}));