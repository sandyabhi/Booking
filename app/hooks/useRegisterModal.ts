import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  count: number;
  onOpen: () => void;
  onClose: () => void;
  increment: () => void;
}

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  count: 0,
  increment: () => set((state) => ({ count: state.count + 2 })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
