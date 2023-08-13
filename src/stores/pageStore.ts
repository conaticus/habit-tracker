import {create} from "zustand";
import {Page} from "../types.ts";

interface PageState {
    currentPage: Page;
    setPage: (newPage: Page) => void;
}

const usePageStore = create<PageState>((set) => ({
    currentPage: Page.Questions,
    setPage: (newPage) => set(() => ({ currentPage: newPage }))
}))

export default usePageStore;