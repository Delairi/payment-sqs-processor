import { get, post } from "aws-amplify/api";
import type { StatusPayment } from "../interfaces/Status.interface";

export async function GetStatusPayment() {
    try {
        const newStatus = await get({
            apiName: 'PaymentAPI',
            path: '/status',
            options: {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        })

        const data = await newStatus.response;
        const response = await data.body.json() as unknown as StatusPayment;
        return response;

    } catch (error) {
        console.log('Change status failed: ', error);
    }
}

export async function NewPaymentStatus(status: boolean) {
    try {
        const newStatus = await post({
            apiName: 'PaymentAPI',
            path: '/status',
            options: {
                body: { status },
                headers: {
                    "Content-Type": "application/json",
                },
            },
        })

        const data = await newStatus.response;
        const response = await data.body.json();
        return response;

    } catch (error) {
        console.log('Change status failed: ', error);
    }
}