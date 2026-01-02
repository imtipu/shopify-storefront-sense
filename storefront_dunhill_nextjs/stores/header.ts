import { create } from "zustand";

interface HeaderState {
	isSticky: boolean;
	topPosition: number;
	height: number;
	setIsSticky: (isSticky: boolean) => void;
	setTopPosition: (topPosition: number) => void;
	setHeight: (height: number) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
	isSticky: false,
	topPosition: 0,
	height: 0,
	setIsSticky: (isSticky) => set({ isSticky }),
	setTopPosition: (topPosition) => set({ topPosition }),
	setHeight: (height) => set({ height }),
}));

interface SidebarMenuState {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onOpenChange: (isOpen: boolean) => void;
}

export const useSidebarMenu = create<SidebarMenuState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	onOpenChange: (isOpen) => set({ isOpen }),
}));

