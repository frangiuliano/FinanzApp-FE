import { create } from 'zustand';
import { Space } from '@/types/space';

interface SpaceStore {
  spaces: Space[];
  setSpaces: (spaces: Space[]) => void;
  selectedSpace: Space | null;
  setSelectedSpace: (space: Space | null) => void;
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  spaces: [],
  setSpaces: (spaces) => set({ spaces }),
  selectedSpace: null,
  setSelectedSpace: (space) => set({ selectedSpace: space }),
}));