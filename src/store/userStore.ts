// stores/userStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the user data interface
interface User {
  id: string;
  firstName: string;
  LastName: string;
  fullName: string;
  hasPin: boolean;
  email: string;
  matricNumber: number;
  pin: number;
  status: string;
  transactions: Array<string>[];
  userRole: string;
  walletBalance: number;
  createdAt?: string;
  walletId: string;
}

// Define the store interface
interface UserStore {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  updateWalletBalance: (newBalance: number) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed values
  isAuthenticated: boolean;
}

// Create the store
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: false,
      error: null,

      // Computed value
      get isAuthenticated() {
        return !!get().user;
      },

      // Actions
      setUser: (user) =>
        set({
          user,
          error: null,
          isLoading: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      updateWalletBalance: (newBalance) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, walletBalance: newBalance }
            : null,
        })),

      clearUser: () =>
        set({
          user: null,
          error: null,
          isLoading: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),
    }),

    {
      name: "user-storage", // Storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
);

// Selector hooks for better performance (optional but recommended)
export const useStoreUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
export const useUserActions = () =>
  useUserStore((state) => ({
    setUser: state.setUser,
    updateUser: state.updateUser,
    updateWalletBalance: state.updateWalletBalance,
    clearUser: state.clearUser,
    setLoading: state.setLoading,
    setError: state.setError,
  }));
