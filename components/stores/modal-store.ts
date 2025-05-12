import { create } from 'zustand';

interface ModalStore {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  openLogin: () => void;
  openSignup: () => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
  openSignup: () => set({ isLoginOpen: false, isSignupOpen: true }),
  closeAll: () => set({ isLoginOpen: false, isSignupOpen: false }),
}));
