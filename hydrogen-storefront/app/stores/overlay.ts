import {create} from 'zustand';

interface OverlayState {
  isOpen: boolean;
  openOverlay: () => void;
  closeOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  isOpen: false,
  openOverlay: () => set({isOpen: true}),
  closeOverlay: () => set({isOpen: false}),
}));
