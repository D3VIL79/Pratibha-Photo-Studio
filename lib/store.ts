import { create } from "zustand";

interface AppState {
  cursorVariant: "default" | "hover" | "text" | "hidden";
  setCursorVariant: (variant: "default" | "hover" | "text" | "hidden") => void;
}

export const useAppStore = create<AppState>((set) => ({
  cursorVariant: "default",
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
