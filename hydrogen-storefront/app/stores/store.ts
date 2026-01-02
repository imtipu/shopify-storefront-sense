import {create} from 'zustand';

interface UIState {
  isQuickViewOpen: boolean;
  quickViewProductHandle: string | null;
  openQuickView: (handle: string) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isQuickViewOpen: false,
  quickViewProductHandle: null,
  openQuickView: (handle) =>
    set({isQuickViewOpen: true, quickViewProductHandle: handle}),
  closeQuickView: () =>
    set({isQuickViewOpen: false, quickViewProductHandle: null}),
}));
