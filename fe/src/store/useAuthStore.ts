import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  step: number;
  name: string;
  userId: number | null;
  birthday: string;
  phoneNumber: string;
  carrier: string;
  verificationCode: string;
  isNewUser: boolean;
  isLoggedIn: boolean;
  errors: Partial<
    Record<
      "name" | "birthday" | "phoneNumber" | "carrier" | "verificationCode",
      string
    >
  >;

  nextStep: () => void;
  setField: <
    K extends Exclude<
      keyof AuthState,
      | "errors"
      | "step"
      | "nextStep"
      | "setField"
      | "setError"
      | "clearError"
      | "setIsNewUser"
      | "setIsLoggedIn"
      | "reset"
      | "resetSignupState"
      | "setUserInfo"
    >,
  >(
    field: K,
    value: AuthState[K],
  ) => void;

  setUserInfo: (name: string, userId: number) => void;
  setError: (field: keyof AuthState["errors"], message: string) => void;
  clearError: (field: keyof AuthState["errors"]) => void;
  setIsNewUser: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;

  reset: () => void;
  resetSignupState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      step: 1,
      name: "",
      userId: null,
      birthday: "",
      phoneNumber: "",
      carrier: "",
      verificationCode: "",
      isNewUser: false,
      isLoggedIn: false,
      errors: {},

      nextStep: () => set((state) => ({ step: state.step + 1 })),

      setField: (field, value) => set(() => ({ [field]: value })),

      setUserInfo: (name, userId) => set(() => ({ name, userId })),

      setError: (field, message) =>
        set((state) => ({
          errors: { ...state.errors, [field]: message },
        })),

      clearError: (field) =>
        set((state) => {
          const copy = { ...state.errors };
          delete copy[field];
          return { errors: copy };
        }),

      setIsNewUser: (value) => set({ isNewUser: value }),
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),

      reset: () =>
        set(() => ({
          step: 1,
          name: "",
          userId: null,
          birthday: "",
          phoneNumber: "",
          carrier: "",
          verificationCode: "",
          isNewUser: false,
          isLoggedIn: false,
          errors: {},
        })),

      resetSignupState: () =>
        set((state) => ({
          step: 1,
          name: "",
          birthday: "",
          phoneNumber: "",
          carrier: "",
          verificationCode: "",
          isNewUser: false,
          errors: {},
          isLoggedIn: state.isLoggedIn,
          userId: state.userId,
        })),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
      }),
    },
  ),
);
