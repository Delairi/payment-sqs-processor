import { post } from "aws-amplify/api"

export async function CreateOrderService(name: string, card: string) {
    try {
        const create = post({
            apiName: 'PaymentAPI',
            path: '/orders',
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