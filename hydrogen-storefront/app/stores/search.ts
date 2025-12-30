import {create} from 'zustand';

// search bar toggle

type SearchStore = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  setOpen: (open: boolean) => set({isOpen: open}),
}));
