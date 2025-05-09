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
  accessToken: string | null;
  refreshToken: string | null;
  isAnalyzed: boolean;

  errors: Partial<
    Record<
      "name" | "birthday" | "phoneNumber" | "carrier" | "verificationCode",
      string
    >
  >;

  setStep: (step: number) => void;
  nextStep: () => void;
  setField: <
    K extends keyof Omit<
      AuthState,
      | "errors"
      | "setStep"
      | "nextStep"
      | "setField"
      | "setError"
      | "clearError"
      | "setIsNewUser"
      | "setIsLoggedIn"
      | "setAccessToken"
      | "setRefreshToken"
      | "reset"
      | "resetSignupState"
      | "setUserInfo"
      | "setIsAnalyzed"
      | "logout" // ✅ 추가
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
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAnalyzed: (value: boolean) => void;

  reset: () => void;
  resetSignupState: () => void;
  logout: () => void; // ✅ 타입에 추가
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
      accessToken: null,
      refreshToken: null,
      isAnalyzed: false,
      errors: {},

      setStep: (newStep) => set(() => ({ step: newStep })),
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
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setIsAnalyzed: (value) => set({ isAnalyzed: value }),

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
          accessToken: null,
          refreshToken: null,
          isAnalyzed: false,
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
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAnalyzed: state.isAnalyzed,
        })),

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set(() => ({
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
          userId: null,
        }));
      }, // ✅ logout 함수 구현 추가
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAnalyzed: state.isAnalyzed,
      }),
    },
  ),
);
