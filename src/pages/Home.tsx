import { useEffect, type FormEvent } from "react";
import CreditCard from "../components/CreditCard"
import { CreateOrderService, GetOrdersService } from "../services/Order.service"

const Home = () => {
    
    useEffect(() => {
      GetOrdersService()
    }, [])
    const createOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e)
        const form = new FormData(e.currentTarget);
        const name = form.get("name") as string;
        const card = form.get("card") as string;
        if (!name || !card) return
        const response = await CreateOrderService(name, card)
        console.log(response)
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <CreditCard createOrder={(e) => createOrder(e)} />
        </div>
    )
}

export default Home
