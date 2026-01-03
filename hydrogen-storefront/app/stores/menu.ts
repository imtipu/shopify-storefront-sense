import {create} from 'zustand';
import {useOverlayStore} from './overlay';

interface MobileMenuState {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isOpen: false,
  openMenu: () => {
    set({isOpen: true});
    useOverlayStore.getState().openOverlay();
  },
  closeMenu: () => {
    set({isOpen: false});
    useOverlayStore.getState().closeOverlay();
  },
  toggleMenu: () =>
    set((state) => {
      const nextOpen = !state.isOpen;
      if (nextOpen) {
        useOverlayStore.getState().openOverlay();
      } else {
        useOverlayStore.getState().closeOverlay();
      }
      return {isOpen: nextOpen};
    }),
}));

