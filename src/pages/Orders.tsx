import { useEffect } from "react"
import useStore from "../store"
import { useOrders } from "../hooks/Orders.hook"

const Orders = () => {
  const { setOrders, setIsLoading } = useStore()
  const { data: orders, isLoading, isFetching } = useOrders();

  useEffect(() => {
    if (!orders || isLoading) return;
    setOrders(orders)
  }, [])

  useEffect(() => {
    setIsLoading(isFetching)
  }, [isFetching])
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
      {
        orders && orders.map((order) => {
          return (
            <div
              className="bg-white backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-4 transition transform hover:scale-105 hover:shadow-2xl font-montserrat"
              key={order.id}
            >
              <p className="text-sm font-bold">Order: <span className="font-semibold text-[#575757]">{order.orderId}</span></p>
              <p className="text-sm font-bold">Client: <span className="font-semibold text-[#575757]">{order.name}</span></p>
              <p className="text-sm font-bold">Card: <span className="font-semibold text-[#575757]">{order.card}</span></p>
              <p className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'PAYED' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
                {order.status}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Orders
