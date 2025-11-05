import { create } from 'zustand';

// Tab keys mapping
const TAB_KEYS = {
  home: 0,
  goal: 1,
  addSaving: 2,
  historyGoals: 3,
  historySavings: 4,
  about: 5,
} as const;

// Simple store to manage tab navigation
interface NavigationStore {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  navigateToTab: (tabKey: keyof typeof TAB_KEYS) => void;
}

const useNavigationStore = create<NavigationStore>((set) => ({
  activeTabIndex: 0,
  setActiveTabIndex: (index) => set({ activeTabIndex: index }),
  navigateToTab: (tabKey) => {
    const index = TAB_KEYS[tabKey];
    if (index !== undefined) {
      set({ activeTabIndex: index });
    }
  },
}));

export default useNavigationStore;

