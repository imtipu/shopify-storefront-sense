import {create} from 'zustand';
import {useOverlayStore} from './overlay';

// state for cart drawer
interface CartState {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartDrawer = create<CartState>((set) => ({
  isOpen: false,
  openCart: () => {
    set({isOpen: true});
    useOverlayStore.getState().openOverlay();
  },
  closeCart: () => {
    set({isOpen: false});
    useOverlayStore.getState().closeOverlay();
  },
}));
