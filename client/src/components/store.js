import { create } from 'zustand';

export const useCount = create((set) => ({
  count: 1,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));

export const useProduct = create((set) => ({
  product: [],
  addProduct: (newProduct) =>
    set((state) => ({ product: [...state.product, newProduct] })),
  removeProduct: (deleteProduct) =>
    set((state) => ({
      product: state.product.filter((el) => el.id !== deleteProduct),
    })),
}));
// export const useTotalPrice = create((set) => ({
//   total: 0,
//   totalItemPrice: () => set((state) => ({ total: state })),
// }));