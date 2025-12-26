import { create } from "zustand";

export const useHeaderStore = create((set) => ({
    isSticky: false,
    topPosition: 0,
    height: 0,
    setIsSticky: (isSticky: boolean) => set({ isSticky }),
    setTopPosition: (topPosition: number) => set({ topPosition }),
    setHeight: (height: number) => set({ height }),
}));

