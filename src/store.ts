import { create } from 'zustand';
import type { OrderProps } from './interfaces/Order.interface';

interface StoreProps {
    orders: OrderProps[] | null;
    setOrders: (value: OrderProps[] | null) => void;
}
const useStore = create<StoreProps>((set) => ({
    orders: null,
    setOrders: (value: OrderProps[] | null) => set(() => ({ orders: value })),
}));

export default useStore;
