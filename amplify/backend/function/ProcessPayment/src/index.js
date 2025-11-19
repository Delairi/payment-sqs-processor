

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        console.log("Mensaje recibido de SQS:", body);
    }

    return { status: 'ok' };
};