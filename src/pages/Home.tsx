import { useEffect, type FormEvent } from "react";
import CreditCard from "../components/CreditCard"
import { CreateOrderService, ProccesingPaymentService } from "../services/Order.service"
import { GetStatusPayment } from "../services/Payment.service";
import useStore from "../store";

const Home = () => {

    const { setIsLoading, setStatusPayment, statusPayment } = useStore()

    useEffect(() => {
        if(statusPayment) return;
        setIsLoading(true)
        GetStatusPayment().then(response => {
            if (!response) return;
            setStatusPayment(response)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [])

    const createOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const form = new FormData(e.currentTarget);
        const name = form.get("name") as string;
        const card = form.get("card") as string;
        if (!name || !card) return
        const createOrder = await CreateOrderService(name, card)
        if (!createOrder) return;
        await ProccesingPaymentService(createOrder.id)
        setIsLoading(false)
    }

    return (
        <div className="w-full h-full content-center">
            <CreditCard createOrder={(e) => createOrder(e)} />
        </div>
    )
}

export default Home
