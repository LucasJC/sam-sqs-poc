import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"; 
import fetch from "node-fetch";
import aws from "aws-sdk";

export const handler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  
  const request = JSON.parse(event.body ?? '');
  
  if (!request) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        "error": "Invalid request format"
      })
    }
  }

  console.log(`Executing fetch for: [${request.url}]`);

  const response = await fetch(request.url, {
    method: "GET"
  });
  
  const data = (await response.text());
  const sqs = new aws.SQS();

  const queueURLResult = await sqs.getQueueUrl({
    QueueName: process.env.QUEUE_NAME!
  }).promise();

  if (!queueURLResult.QueueUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        "error": `Error obtaining queue URL: ${queueURLResult.$response.error}`
      })
    };
  }

  console.log(`Queue URL obtained: ${queueURLResult.QueueUrl}. Sending message...`);

  const sendMessageResult = await sqs.sendMessage({
    QueueUrl: queueURLResult.QueueUrl,
    MessageBody: data
  }).promise();

  if (sendMessageResult.$response.error) {
    return {
      statusCode: 500,
      body: `Error sending message to queue: ${JSON.stringify(sendMessageResult.$response.error)}`
    };
  }

  return {
    statusCode: 200,
    body: data
  };
}