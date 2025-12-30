import { create } from 'zustand';

// state for cart drawer
interface CartState {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

export const useCartDrawer = create<CartState>((set) => ({
    isOpen: false,
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
}));
