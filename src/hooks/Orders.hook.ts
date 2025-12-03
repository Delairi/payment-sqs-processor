import { useQuery } from "@tanstack/react-query";
import { GetOrdersService } from "../services/Order.service";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: GetOrdersService,
  });
}