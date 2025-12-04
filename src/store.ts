import { create } from 'zustand';
import type { OrderProps } from './interfaces/Order.interface';
import type { StatusPayment } from './interfaces/Status.interface';

interface StoreProps {
    orders: OrderProps[] | null;
    setOrders: (value: OrderProps[] | null) => void;
    setStatusPayment: (value: StatusPayment | null) => void;
    statusPayment: StatusPayment | null;
    setIsLoading: (value: boolean) => void;
    isLoading: boolean;
}
const useStore = create<StoreProps>((set) => ({
    orders: null,
    setOrders: (value: OrderProps[] | null) => set(() => ({ orders: value })),
    setStatusPayment: (value: StatusPayment | null) => set(() => ({ statusPayment: value })),
    statusPayment: null,
    setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
    isLoading: false,
}));

export default useStore;
