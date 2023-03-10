import create from 'zustand'; // create로 zustand를 불러옵니다., 리덕스 대체

const useStore = create((set) => ({
  count: 0,
  // increasePopulation: () => set((state) => ({ count: state.count + 1 })),
  // 이전값 bears에 +1
  // removeAllBears: () => set({ count: 0 }),
  setFilterOption: (input) => set({ count: input }),
}));

export default useStore;
