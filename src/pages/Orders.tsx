import { useEffect } from "react"
import useStore from "../store"
import { useOrders } from "../hooks/Orders.hook"

const Orders = () => {
  const { setOrders } = useStore()
  const { data: orders, isLoading } = useOrders();

  useEffect(() => {
    if (!orders || isLoading) return;
    setOrders(orders)    
  }, [])
  return (
    <div className="flex flex-col gap-5">
      {
        orders && orders.map((order) => {
          return <div
            className="flex flex-col"
            key={order.id}>
            <p>Client: {order.name}</p>
            <p>Card: {order.card}</p>
            <p>Order Id: {order.orderId}</p>
          </div>
        })
      }
    </div>
  )
}

export default Orders
