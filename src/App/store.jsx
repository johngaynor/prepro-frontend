import { create } from "zustand";

const useAppStore = create((set) => ({
  // state
  user: {},
  userLoading: true,
  isAuthenticated: false,
  apps: [],
  appsLoading: false,
  // state modifiers
  loadUser: (s) =>
    set({
      user: s,
      userLoading: false,
      isAuthenticated: !!Object.keys(s).length,
    }),
  fetchApps: () => set({ appsLoading: true }),
  loadApps: (s) =>
    set({
      apps: s,
      appsLoading: false,
    }),
  clearApps: () => set({ apps: [] }),
}));

export default useAppStore;
