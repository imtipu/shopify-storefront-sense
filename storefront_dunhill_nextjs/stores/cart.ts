import { create } from "zustand";

interface CartState {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onOpenChange: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	onOpenChange: (isOpen) => set({ isOpen }),
}));
