import { create } from "zustand";

export const useStore = create((set) => ({
  todo: {},
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (data) => set({ user: data }),
  setTodo: (todoToStore) => set({ todo: todoToStore }),
}));
