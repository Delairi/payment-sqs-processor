import { get, post } from "aws-amplify/api"

export async function CreateOrderService(name: string, card: string) {
    try {
        const create = post({
            apiName: 'PaymentAPI',
            path: '/payment',
            options: {
                body: {
                    name,
                    card
                },
                headers: {
                    "Content-Type": "application/json",
                },
            },

        });

        const { body } = await create.response;
        const response = await body.json();
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
        const response = await body.json();
        return response;
    } catch (error) {
        console.log('Get orders failed: ', error);
    }
}