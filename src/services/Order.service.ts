import { get } from "aws-amplify/api"
import type { OrderProps } from "../interfaces/Order.interface";
import { URL_PROCESS_PAYMENT } from "../constants";

export async function CreateOrderService(name: string, card: string) {
    try {
        const create = await fetch(`${URL_PROCESS_PAYMENT}/payment`, {
            method: "POST",
            body: JSON.stringify({
                name,
                card
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const response = await create.json();
        return response;
    } catch (error) {
        console.log('Order create failed: ', error);
    }
}

export async function GetOrdersService() {
    try {
        const create = get({
            apiName: 'PaymentAPI',
            path: '/orders',
            options: {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        });

        const { body } = await create.response;
        const response = await body.json() as unknown as OrderProps[];
        return response;
    } catch (error) {
        console.log('Get orders failed: ', error);
    }
}