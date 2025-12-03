import { create } from 'zustand';
import type { OrderProps } from './interfaces/Order.interface';
import type { StatusPayment } from './interfaces/Status.interface';

interface StoreProps {
    orders: OrderProps[] | null;
    setOrders: (value: OrderProps[] | null) => void;
    setStatusPayment: (value: StatusPayment | null) => void;
    statusPayment: StatusPayment | null;
}
const useStore = create<StoreProps>((set) => ({
    orders: null,
    setOrders: (value: OrderProps[] | null) => set(() => ({ orders: value })),
    setStatusPayment: (value: StatusPayment | null) => set(() => ({ statusPayment: value })),
    statusPayment: null,
}));

export default useStore;
