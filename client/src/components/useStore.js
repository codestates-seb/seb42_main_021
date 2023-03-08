import create from 'zustand'; // create로 zustand를 불러옵니다., 리덕스 대체

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // 이전값 bears에 +1
  removeAllBears: () => set({ bears: 0 }),
}));

export default useStore;
