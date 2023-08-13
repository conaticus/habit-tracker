import {SummarizedHabit} from "../types.ts";
import {create} from "zustand";

interface HabitsState {
    summarizedHabits: SummarizedHabit[];
    currentHabitToReschedule: SummarizedHabit | null;
    setSummarizedHabits: (summarizedHabits: SummarizedHabit[]) => void;
    setCurrentHabitToReschedule: (habitToReschedule: SummarizedHabit) => void;
}

const useHabitsStore = create<HabitsState>((set) => ({
    summarizedHabits: [],
    currentHabitToReschedule: null,
    setSummarizedHabits: (summarizedHabits) => set(() => ({ summarizedHabits })),
    setCurrentHabitToReschedule: (habitToReschedule) => set(() => ({ currentHabitToReschedule: habitToReschedule }))
}))

export default useHabitsStore;
