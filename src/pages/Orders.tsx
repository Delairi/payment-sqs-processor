import { useEffect } from "react"
import { GetOrdersService } from "../services/Order.service"
import useStore from "../store"

const Orders = () => {
  const { orders, setOrders } = useStore()
  useEffect(() => {
    if (orders) return
    GetOrdersService().then(res => {
      if (!res) return
      setOrders(res)
    })
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
